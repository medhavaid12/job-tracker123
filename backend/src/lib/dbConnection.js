import "./env.js";
import mongoose from "mongoose";

const url = process.env.MONGODB_URI;

const connectToDB = async () => {
  try {
    const connection = await mongoose.connect(url);
    console.log("MongoDB connected:", connection.connection.host);
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};

export default connectToDB;
