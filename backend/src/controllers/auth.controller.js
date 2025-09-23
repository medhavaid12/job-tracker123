import AuthRepository from "../repositories/auth.repository.js";
import validateUserInput from "../lib/validators.js";
import generateJwtToken from "../lib/generateJwtToken.js";

export default class AuthController {
  constructor() {
    this.authRepository = new AuthRepository();
  }

  // Check Auth
  async checkAuth(req, res, next) {
    try {
      // Fetch user from DB
      const result = await this.authRepository.checkAuth(req.user.id);

      res.status(200).json({ status: "success", response: result });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  // Signup
  async signup(req, res, next) {
    const { accessFrom, ...user } = req.body;
    try {
      // User Input validation
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

      // Add user to DB
      const result = await this.authRepository.signup(user);

      // Generate token
      const token = generateJwtToken(result, accessFrom, res);

      res.status(201).json({ status: "success", response: result, token });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  // Login
  async login(req, res, next) {
    const { accessFrom, ...user } = req.body.data || req.body;
    try {
      // User Input validation
      const validationError = validateUserInput(user, ["email", "password"]);
      if (validationError) {
        return res
          .status(400)
          .json({ status: "failed", message: validationError });
      }

      // Login user
      const result = await this.authRepository.login(user);

      // Handle failed login
      if (!result) {
        return res
          .status(401)
          .json({ status: "failed", message: "Invalid email or password" });
      }

      // Generate token
      const token = generateJwtToken(result, accessFrom, res);

      res.status(200).json({ status: "success", response: result, token });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  // Logout
  async logout(req, res, next) {
    try {
      // Clear cookie
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
      });

      res
        .status(200)
        .json({ status: "success", response: "Logged out successfully" });
    } catch (error) {
      console.error("Logout error:", error);
      next(error);
    }
  }
}
