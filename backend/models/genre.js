import mongoose from "mongoose";

// Schema for genre
const genreSchema = new mongoose.Schema({
  id: { type: Number, required: true, index: true },
  name: { type: String, index: true },
});

const Genre = mongoose.model("Genre", genreSchema);

export default Genre;
