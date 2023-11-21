import mongoose from "mongoose";

// Schema for movie
const movieSchema = new mongoose.Schema({
  adult: Boolean,
  backdrop_path: String,
  genre_ids: [{ type: Number, index: true }],
  id: Number,
  original_language: String,
  original_title: String,
  overview: String,
  popularity: Number,
  poster_path: String,
  release_date: String,
  title: { type: String, index: true },
  video: Boolean,
  vote_average: Number,
  vote_count: Number,
  reviews: Array,
  favourite: { type: Boolean, required: true, default: false },
  cast: Array,
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
