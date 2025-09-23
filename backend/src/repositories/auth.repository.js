import UserModel from "../models/auth.model.js";
import { hashPassword, comparePassword } from "../lib/hashPassword.js";

export default class AuthRepository {
  // Check Auth
  async checkAuth(userData) {
    try {
      const user = await UserModel.findById(userData);
      if (!user) return null;

      const { password, ...userWithoutPassword } = user.toObject();
      return userWithoutPassword;
    } catch (error) {
      console.error(error);
      throw new Error(`Check Auth failed: ${error.message}`);
    }
  }

  // Signup user
  async signup(userData) {
    try {
      // Hash user password before storing
      const hashedPassword = await hashPassword(userData.password);

      // Store user to DB
      const newUser = new UserModel({
        ...userData,
        password: hashedPassword,
      });
      await newUser.save();

      // Return user without password
      const { password, ...userWithoutPassword } = newUser.toObject();
      return userWithoutPassword;
    } catch (error) {
      console.error(error);
      throw new Error(`Signup failed: ${error.message}`);
    }
  }

  // Login user
  async login(userData) {
    try {
      // Find user in DB
      const user = await UserModel.findOne({ email: userData.email });
      if (!user) return null;

      // Compare passwords
      const isMatch = await comparePassword(userData.password, user.password);
      if (!isMatch) return null;

      // Return user without password
      const { password, ...userWithoutPassword } = user.toObject();
      return userWithoutPassword;
    } catch (error) {
      console.error(error);
      throw new Error(`Login failed: ${error.message}`);
    }
  }

  // TODO: Move logout logic to repository
  async logout() {
    try {
    } catch (error) {
      console.error(error);
      throw new Error(`Logout failed: ${error.message}`);
    }
  }
}
