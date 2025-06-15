import UserModel from "../models/auth.model.js";

export default class AuthRepository {
  async signup(user) {
    try {
      const newUser = await UserModel(user);
      newUser.save();

      return newUser;
    } catch (error) {
      console.log(error.message);
    }
  }

  async login(user) {
    try {
      const result = await UserModel.findOne({ email: user.email });
      return result;
    } catch (error) {
      console.log(error.message);
    }
  }

  async logout() {}
}
