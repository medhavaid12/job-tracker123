import UserModel from "../models/auth.model.js";
import { hashPassword, comparePassword } from "../lib/hashPassword.js";

export default class AuthRepository {
  async signup(user) {
    try {
      // Hash user password
      const hashedPassword = await hashPassword(user.password);

      // Save new user to database
      const newUser = new UserModel({
        ...user,
        password: hashedPassword,
      });
      await newUser.save();

      // Exclude password from return value
      const { password, ...userWithoutPassword } = newUser.toObject();
      return userWithoutPassword;
    } catch (error) {
      throw new Error(`Signup failed: ${error.message}`);
    }
  }

  async login(userData) {
    try {
      // Get user by email
      const user = await UserModel.findOne({ email: userData.email });
      if (!user) {
        throw new Error("Invalid email or password");
      }

      // Compare passwords
      const isMatch = await comparePassword(userData.password, user.password);
      if (!isMatch) {
        throw new Error("Invalid email or password");
      }

      // Exclude password from return value
      const { password, ...userWithoutPassword } = user.toObject();
      return userWithoutPassword;
    } catch (error) {
      throw new Error(`Login failed: ${error.message}`);
    }
  }

  async logout() {
    try {
    } catch (error) {
      throw new Error(`Logout failed: ${error.message}`);
    }
  }
}
