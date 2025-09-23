import bcrypt from "bcrypt";

const saltRounds = 12;

async function hashPassword(password) {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error(`Failed to hash password: ${error.message}`);
  }
}

async function comparePassword(userPassword, storedPassword) {
  try {
    const result = await bcrypt.compare(userPassword, storedPassword);
    return result;
  } catch (error) {
    throw new Error(`Failed to compare passwords: ${error.message}`);
  }
}

export { hashPassword, comparePassword };
