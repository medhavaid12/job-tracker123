// data: user input data
// requiredFields: Array of required fields
export default function validateUserInput(data, requiredFields) {
  // Get nested values
  const getNestedValues = (obj, path) => {
    return path
      .split(".")
      .reduce(
        (acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined),
        obj
      );
  };

  // iterate over the requiredFields array
  for (const field of requiredFields) {
    const value = getNestedValues(data, field);
    // check the field in user input data
    if (value === undefined || value === null) {
      return `Missing ${field}`;
    } else if (typeof value === "string" && value.trim() === "") {
      return `Invalid ${field}`;
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

  // No errors
  return null;
}
