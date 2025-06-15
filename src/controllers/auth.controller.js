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
      return res.status(201).json({ status: "success", response: result });
    } catch (error) {
      console.log(error);
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
      res.status(200).json({ status: "success", response: result });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async logout(req, res, next) {}
}
