const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const genreSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
});

module.exports = mongoose.model("Genre", genreSchema);