import express from "express";
import AuthController from "../controllers/auth.controller.js";
import jwtAuth from "../middlewares/jwtAuth.js";

const authRouter = express.Router();
const authController = new AuthController();

authRouter.post("/signup", (req, res, next) => {
  authController.signup(req, res, next);
});

authRouter.post("/login", (req, res, next) => {
  authController.login(req, res, next);
});

authRouter.get("/logout", jwtAuth, (req, res, next) => {
  authController.logout(req, res, next);
});

export default authRouter;
