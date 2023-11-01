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
  Genre: {
    moviesInGenreCount: async (parent) => {
      return await Movie.countDocuments({ genre_ids: parent.id });
    },
  },
  Query: {
    genre: async (_, args) => {
      return await Genre.findOne({ name: args.name });
    },
    genres: async () => {
      return await Genre.find({});
    },
    movie: async (_, args) => {
      const movie = await Movie.findOne({ id: args.id });
      return movie;
    },
    movies: async (_, { limit, offset, sortField, sortOrder, genre }) => {
      let query = {};
      if (genre) {
        const genreDoc = await Genre.findOne({ name: genre });
        if (genreDoc) {
          query.genre_ids = genreDoc.id;
        }
      }
      const movies = await Movie.find(query)
        .sort({ [sortField]: sortOrder })
        .limit(limit)
        .skip(offset);
      const moviesCount = await Movie.countDocuments(query);
      return { movies, moviesCount };
    },
    moviesCount: async () => {
      return await Movie.countDocuments({});
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
      const movies = await Favourite.find({ userid: args.userid });
      const movieIds = movies.map((movie) => movie.movieid);
      const fullMovies = await Promise.all(
        movieIds.map(async (id) => {
          const movie = await Movie.findOne({ id });
          const genres = await Genre.find({ id: { $in: movie.genre_ids } });
          const reviews = await Review.find({ movieid: movie.id });
          return { ...movie.toObject(), genres, reviews };
        })
      );
      return fullMovies;
    },
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
      };
    },
    deleteFavourite: async (_, args) => {
      const wasDeleted = (
        await Favourite.deleteOne({
          movieid: args.movieid,
          userid: args.userid,
        })
      ).deletedCount;
      return wasDeleted;
    },
    addUser: async (_, args) => {
      const maxId = await User.findOne()
        .sort({ id: -1 })
        .limit(1)
        .then((user) => (user ? user.id : 0));
      const user = new User({
        username: args.username,
        id: maxId + 1,
      });
      return user.save();
    },

    addReview: async (_, args) => {
      const maxId = await Review.findOne()
        .sort({ id: -1 })
        .limit(1)
        .then((review) => (review ? review.id : 0));
      const review = new Review({
        id: maxId + 1,
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
      };
    },

    toggleFavourite: async (_, args) => {
      const movie = await Movie.findOne({ id: args.movieid });
      if (!movie) {
        throw new Error(`Movie with id ${args.movieid} not found`);
      }
      movie.favourite = !movie.favourite;
      await movie.save();
      return movie.favourite;
    },

    deleteReview: async (_, args) => {
      const wasDeleted = (await Review.deleteOne({ id: args.id })).deletedCount;
      return wasDeleted;
    },
  },
};
