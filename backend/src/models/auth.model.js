import mongoose from "mongoose";

// User Schema
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"],
    },
    password: { type: String, required: true, trim: true },
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
  },
  { timestamps: true }
);

// Export user model
const UserModel = mongoose.model("User", userSchema);
export default UserModel;
