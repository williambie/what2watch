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
  type MovieResults {
    movies: [Movie!]
    moviesCount: Int!
  }
  
  type Genre {
    id: Int
    name: String
    movies: [Movie!]
    moviesInGenreCount: Int!
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
    genre(name: String!): Genre
    genres: [Genre]
    movie(id: Int!): Movie
    movies(limit: Int, offset: Int, sortField: String, sortOrder: Int, genre: String): MovieResults
    favouriteMovies: [Movie]
    moviesCount: Int
    user(id: Int!): User
    users: [User]
    reviews(movieid: Int!): [Review]
    favourites(userid: Int!): [Movie]
    checkFavourite(movieid: Int!): Boolean
  }

  type Mutation {
    addUser(username: String!): User!
    toggleFavourite(movieid: Int!): [Movie]
    addReview(content: String!, rating: Int!, timestamp: String!, movieid: Int!, userid: Int!): Review!
    deleteReview(id: Int!): Boolean
  }
`;