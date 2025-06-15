import AuthRepository from "../repositories/auth.repository.js";

export default class AuthController {
  constructor() {
    this.authRepository = new AuthRepository();
  }

  async signup(req, res, next) {
    const user = req.body;
    try {
      const result = await this.authRepository.signup(user);
      res.status(200).json({ status: "success", response: result });
    } catch (error) {
      console.log(error);
    }
  }

  async login(req, res, next) {
    const user = req.body;
    try {
      const result = await this.authRepository.login(user);
      res.status(200).json({ status: "success", response: result });
    } catch (error) {
      console.log(error);
    }
  }

  async logout(req, res, next) {}
}
