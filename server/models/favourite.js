const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favouriteSchema = new Schema({
  movieid: Number,
  userid: Number
});

module.exports = mongoose.model("Favourite", favouriteSchema);