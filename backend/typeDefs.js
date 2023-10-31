export const typeDefs = `#graphql
  type Movie {
    id: Int!
    title: String
    poster_path: String
    vote_average: Float
    overview: String
    release_date: String
    popularity: Float
    genres: [Genre!]
    reviews: [Review!]
    favourite: Boolean!
  }
  
  type Genre {
    id: Int
    name: String
    movies: [Movie!]
  }
  type User {
    id: Int!
    username: String!
  }
  type Review {
    id: Int!
    content: String!
    rating: Int!
    timestamp: String!
    movieid: Int!
    userid: Int!
  }
  
  type Favourite {
    movieid: Int!
    userid: Int!
  }

  type Query {
    genre(id: Int!): Genre
    genres: [Genre]
    movie(id: Int!): Movie
    movies(limit: Int, offset: Int): [Movie]
    moviesCount: Int
    user(id: Int!): User
    users: [User]
    reviews(movieid: Int!): [Review]
    favourites(userid: Int!): [Movie]
  }
  type Mutation {
    addUser(username: String!): User!
    addFavourite(movieid: Int!, userid: Int!): Favourite!
    toggleFavourite(movieid: Int!): Boolean
    deleteFavourite(movieid: Int!, userid: Int!): Boolean
    addReview(content: String!, rating: Int!, timestamp: String!, movieid: Int!, userid: Int!): Review!
    deleteReview(id: Int!): Boolean
  }
`;

/* 

const graphql = require("graphql");
const _ = require("lodash");
const mongoose = require('mongoose');
const Movie = require("../models/movie");
const Genre = require("../models/genre");
const User = require("../models/user");
const Review = require("../models/review");
const Favourite = require("../models/favourite");

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLFloat,
  GraphQLNonNull
} = graphql;

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    poster_path: { type: GraphQLString },
    vote_average: { type: GraphQLFloat },
    overview: { type: GraphQLString },
    release_date: { type: GraphQLString },
    popularity : { type: GraphQLFloat },
    genre: {
      type: new GraphQLList(GenreType),
      async resolve(parent, args) {
        const genreIds = parent.genre_ids;
        const genres = await Genre.find({ id: { $in: genreIds } });
        return genres.map((genre) => ({ name: genre.name }));
      },
    },
    reviews: {
      type: new GraphQLList(ReviewType),
      resolve(parent, args) {
        return Review.find({ movieid: parent.id });
      },
    },
  }),
});

const GenreType = new GraphQLObjectType({
  name: "Genre",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return Movie.find({ genre_ids: parent.id });
      },
    },
  }),
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLInt },
    username: { type: GraphQLString },
  }),
});

const ReviewType = new GraphQLObjectType({
  name: "Review",
  fields: () => ({
    id: { type: GraphQLInt },
    content: { type: GraphQLString },
    timestamp: { type: GraphQLString },
    movieid: {
      type: MovieType,
      resolve(parent, args) {
        return Movie.find({ id: parent.movieid });
      },
    },
    userid: {
      type: UserType,
      resolve(parent, args) {
        return User.find({ id: parent.userid });
      },
    },
  }),
});

const FavouriteType = new GraphQLObjectType({
  name: "Favourite",
  fields: () => ({
    movieid: {
      type: MovieType,
      resolve(parent, args) {
        return Movie.find({ id: parent.movieid });
      },
    },
    userid: {
      type: UserType,
      resolve(parent, args) {
        return User.find({ id: parent.userid });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    genre: {
      type: GenreType,
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        return Genre.findById(args.id);
      },
    },
    genres: {
      type: new GraphQLList(GenreType),
      resolve(parent, args) {
        return Genre.find({});
      },
    },
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        return Movie.findById(args.id);
      },
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return Movie.find({});
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        return User.findById(args.id);
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({});
      },
    },
    reviews: {
      type: new GraphQLList(ReviewType),
      args: { movieid: { type: GraphQLInt } },
      resolve(parent, args) {
        return Review.find({ movieid: args.movieid });
      },
    },
    favourites: {
      type: new GraphQLList(FavouriteType),
      args: { userid: { type: GraphQLInt } },
      resolve(parent, args) {
        return Favourite.find({ userid: args.userid });
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const maxId = await User.findOne().sort({ id: -1 }).limit(1).then(user => user ? user.id : 0);
        const user = new User({
          username: args.username,
          id: maxId + 1,
        });
        return user.save();
      },
    },
    addReview: {
      type: ReviewType,
      args: {
        content: { type: new GraphQLNonNull(GraphQLString) },
        timestamp: { type: new GraphQLNonNull(GraphQLString) },
        movieid: { type: new GraphQLNonNull(GraphQLInt) },
        userid: { type: new GraphQLNonNull(GraphQLInt) },
      },
      async resolve(parent, args) {
        const maxId = await Review.findOne().sort({ id: -1 }).limit(1).then(review => review ? review.id : 0);
        const review = new Review({
          id: maxId + 1,
          content: args.content,
          timestamp: args.timestamp,
          movieid: args.movieid,
          userid: args.userid
        });
        return review.save();
      },
    },
    addFavourite: {
      type: FavouriteType,
      args: {
        movieid: { type: new GraphQLNonNull(GraphQLInt) },
        userid: { type: new GraphQLNonNull(GraphQLInt) },
      },
      async resolve(parent, args) {
        const maxId = await Favourite.findOne().sort({ id: -1 }).limit(1).then(favourite => favourite ? favourite.id : 0);
        const favourite = new Favourite({
          id: maxId + 1,
          movieid: args.movieid,
          userid: args.userid
        });
        return favourite.save();
      },
    }
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
}); */
