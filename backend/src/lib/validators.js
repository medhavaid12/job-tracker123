// data: user input data
// requiredFields: Array of required fields
export default function validateUserInput(data, requiredFields) {
  // iterate over the requiredFields array
  for (const field of requiredFields) {
    // check the field in user input data
    if (!data[field] || data[field].trim() === "") {
      return `Missing or invalid ${field}.`;
    }
  }

  // additional check for email
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return "Invalid email format.";
  }
  // additional check for password
  if (data.password && data.password.length < 6) {
    return "Invalid password. Must be atleast 6 characters long.";
  }
  return null;
}
