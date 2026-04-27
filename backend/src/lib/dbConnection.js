import "./env.js";
import mongoose from "mongoose";

const url = process.env.MONGO_URI || process.env.MONGODB_URI;

if (!url) {
  console.error("Error: MONGO_URI or MONGODB_URI is not defined in environment variables.");
  process.exit(1);
}

const connectToDB = async () => {
  try {
    const connection = await mongoose.connect(url, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      tls: true,
      tlsAllowInvalidCertificates: false,
      appName: "JobTracker",
    });
    console.log("MongoDB connected:", connection.connection.host);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    console.error(error);
    process.exit(1);
  }
};

export default connectToDB;
