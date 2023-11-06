import mongoose from "mongoose";

// Schema for user
const userSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  username: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

export default User;
