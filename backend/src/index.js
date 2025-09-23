import "./lib/env.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectToDB from "./lib/dbConnection.js";
import geminiRouter from "./routes/parser.router.js";
import authRouter from "./routes/auth.router.js";

const app = express();
const PORT = process.env.PORT || 8000;

// Cors config
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/parse-data", geminiRouter);

// default route
app.get("/", (req, res) => {
  res.send("Hi from backend");
});

// Error handler
app.use((error, req, res, next) => {
  console.error("Error:", error.message);
  res.status(500).json({
    status: "failed",
    message: "Something went wrong. Try again later.",
  });
});

app.listen(PORT, () => {
  console.log("Server is listening:", PORT);
  connectToDB();
});
