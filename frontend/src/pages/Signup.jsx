import { useEffect, useState } from "react";
import { SignupUser, authSelector } from "../redux/authReducer";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Signup = () => {
  // State to store user input
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(authSelector);

  // Navigate to dashboard on signup success
  useEffect(() => {
    console.log(isAuthenticated); //remove in production

    // Avoid premature navigation
    if (!loading && isAuthenticated) {
      navigate("/dashboard");
    }
  }, [loading, isAuthenticated, navigate]);

  // Save user input to state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Dispatch formData to make backend request
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(SignupUser(formData));

    // Reset formData state
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-100">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Create Account</h1>

        {/* Display error */}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="firstName"
            >
              Firstname
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-500/30 text-sm px-4 py-2"
              placeholder="John"
              required
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="lastName"
            >
              Lastname
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-500/30 text-sm px-4 py-2"
              placeholder="Doe"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-500/30 text-sm px-4 py-2"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-500/30 text-sm px-4 py-2"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
          >
            Sign Up
          </button>
        </form>

        {/* Link to Login */}
        <p className="text-sm text-center mt-6 text-gray-400">
          Already have an account?{" "}
          <NavLink to="/login" className="text-blue-500 hover:underline">
            Log in
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Signup;
