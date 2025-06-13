import express from "express";
import ParserController from "../controllers/parser.controller.js";

const geminiRouter = express.Router();
const parserController = new ParserController();

geminiRouter.post("/", (req, res, next) => {
  parserController.parseData(req, res, next);
});

export default geminiRouter;
