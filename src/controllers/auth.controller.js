import generateJwtToken from "../lib/generateJwtToken.js";
import validateUserInput from "../lib/validators.js";
import AuthRepository from "../repositories/auth.repository.js";

export default class AuthController {
  constructor() {
    this.authRepository = new AuthRepository();
  }

  async signup(req, res, next) {
    const user = req.body;
    try {
      const validationError = validateUserInput(user, [
        "email",
        "password",
        "firstName",
        "lastName",
      ]);
      if (validationError) {
        return res
          .status(400)
          .json({ status: "failed", message: validationError });
      }

      const result = await this.authRepository.signup(user);

      const token = generateJwtToken(result, res);

      return res
        .status(201)
        .json({ status: "success", response: result, token });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async login(req, res, next) {
    const user = req.body;
    try {
      const validationError = validateUserInput(user, ["email", "password"]);
      if (validationError) {
        return res
          .status(400)
          .json({ status: "failed", message: validationError });
      }

      const result = await this.authRepository.login(user);

      const token = generateJwtToken(result, res);

      return res
        .status(200)
        .json({ status: "success", response: result, token });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
      });
      return res
        .status(200)
        .json({ status: "success", response: "Logged out successfully" });
    } catch (error) {
      console.error("Logout error:", error);
      next(error);
    }
  }
}
