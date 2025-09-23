import express from "express";
import ParserController from "../controllers/parser.controller.js";
import jwtAuth from "../middlewares/jwtAuth.js";

const geminiRouter = express.Router();
const parserController = new ParserController();

geminiRouter.post("/", jwtAuth, (req, res, next) => {
  parserController.parseData(req, res, next);
});

export default geminiRouter;
