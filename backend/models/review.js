import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  content: { type: String, required : true },
  timestamp: { type: String, required : true },
  movieid: { type: Number, required : true },
  userid: { type: Number, required : true }
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;