import mongoose from "mongoose";

// Schema for review
const reviewSchema = new mongoose.Schema({
  id: { type: Number },
  content: { type: String, required: true },
  rating: { type: Number, required: true },
  timestamp: { type: String, required: true },
  movieid: { type: Number, required: true },
  userid: { type: Number, required: true },
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
