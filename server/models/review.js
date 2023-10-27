const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  _id: { type: Number, required: true },
  content: { type: String, required : true },
  timestamp: { type: String, required : true },
  movieid: { type: Number, required : true },
  userid: { type: Number, required : true }
});

module.exports = mongoose.model("Review", reviewSchema);