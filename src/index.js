import "./lib/env.js";
import express from "express";
import connectToDB from "./lib/dbConnection.js";
import geminiRouter from "./routes/parser.router.js";
import authRouter from "./routes/auth.router.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
    allowedHeaders: "*",
  })
);
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/parse-data", geminiRouter);

app.get("/", (req, res) => {
  res.send("Hi from backend");
});

app.listen(PORT, () => {
  console.log("Server is listening:", PORT);
  connectToDB();
});
