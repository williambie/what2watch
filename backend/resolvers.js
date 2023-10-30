import Movie from "./models/movie.js";
import Genre from "./models/genre.js";
import User from "./models/user.js";
import Review from "./models/review.js";
import Favourite from "./models/favourite.js";

export const resolvers = {
  Movie: {
    genres: async (parent) => {
      const genreIds = parent.genre_ids;
      const genres = await Genre.find({ id: { $in: genreIds } });
      return genres;
    },
    reviews: async (parent) => {
      return await Review.find({ movieid: parent.id });
    },
  },
  Query: {
    genre: async (_, args) => {
      return await Genre.findById({ id: args.id });
    },
    genres: async () => {
      return await Genre.find({});
    },
    movie: async (_, args) => {
      const movie = await Movie.findOne({ id: args.id });
      return movie;
    },
    movies: async () => {
      return await Movie.find({});
    },
    user: async (_, args) => {
      const user = await User.findOne({ id: args.id });
      return user;
    },
    users: async () => {
      return await User.find({});
    },
    reviews: async (_, args) => {
      return await Review.find({ movieid: args.movieid });
    },
    favourites: async (_, args) => {
      return await Favourite.find({ userid: args.userid });
    }
  },
  Mutation: {
    addFavourite: async (_, args) => {
      const favourite = new Favourite({
        movieid: args.movieid,
        userid: args.userid,
      });

      const res = await favourite.save();

      return {
        id: res.id,
        ...res._doc,
      }
    },
    deleteFavourite: async (_, args) => {
      const wasDeleted = (await Favourite.deleteOne({ movieid: args.movieid, userid: args.userid })).deletedCount;
      return wasDeleted;
    },
    addUser: async (_, args) => {
      const maxId = await User.findOne().sort({ id: -1 }).limit(1).then(user => user ? user.id : 0);
      const user = new User({
        username: args.username,
        id: maxId + 1,
      });
      return user.save();
    },
    
    
    addReview: async (_, args) => {
      const review = new Review({
        id: args.id,
        content: args.content,
        rating: args.rating,
        timestamp: args.timestamp,
        movieid: args.movieid,
        userid: args.userid,
      });

      const res = await review.save();

      return {
        id: res.id,
        ...res._doc,
      }
    },
    deleteReview: async (_, args) => {
      const wasDeleted = (await Review.deleteOne({ id: args.id })).deletedCount;
      return wasDeleted;
    }
  }
}