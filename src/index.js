import "./lib/env.js";
import express from "express";
import cors from "cors";
import connectToDB from "./lib/dbConnection.js";
import geminiRouter from "./routes/parser.router.js";
import authRouter from "./routes/auth.router.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: "*",
    allowedHeaders: "*",
  })
);
app.use(express.json());
app.use("/api/parse-data", geminiRouter);
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Hi from backend");
});

app.use((error, req, res, next) => {
  console.error("Error:", error.message);
  res
    .status(error.message.includes("Invalid email or password") ? 401 : 500)
    .json({
      status: "failed",
      message: error.message,
    });
});

app.listen(PORT, () => {
  console.log("Server is listening:", PORT);
  connectToDB();
});
