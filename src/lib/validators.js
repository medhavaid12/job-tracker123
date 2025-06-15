export default function validateUserInput(data, requiredFields) {
  for (const field of requiredFields) {
    if (!data[field] || data[field].trim() === "") {
      return `Missing or invalid ${field}.`;
    }
  }

  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return "Invalid email format.";
  }
  if (data.password && data.password.length < 6) {
    return "Invalid password. Must be atleast 6 characters long.";
  }
  return null;
}
