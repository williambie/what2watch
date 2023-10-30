import mongoose from "mongoose";

const favouriteSchema = new mongoose.Schema({
  movieid: { type: Number, required: true, unique: true },
  userid:{ type: Number, required: true }
});

const Favourite = mongoose.model("Favourite", favouriteSchema);

export default Favourite;