import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, logoutUser } from "../redux/authReducer";
import { useEffect, useState } from "react";
import navbarLinks from "../constants/linkConstants";

const Navbar = () => {
  // State to store hamburger visibility
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isAuthenticated } = useSelector(authSelector);

  // Navigate to login on logout success
  useEffect(() => {
    console.log(isAuthenticated); // remove in production

    // Avoid premature navigation
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [loading, isAuthenticated, navigate]);

  // Dispatch logout
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <nav className="bg-gray-900 text-gray-100 shadow-lg">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-bold text-blue-500">Job Tracker</div>

          {/* Desktop Links */}
          {isAuthenticated && (
            <ul className="hidden lg:flex space-x-6">
              {navbarLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-400 font-semibold"
                      : "text-gray-300 hover:text-blue-400"
                  }
                >
                  {label}
                </NavLink>
              ))}
            </ul>
          )}

          {/* Desktop Logout */}
          <div className="hidden lg:block">
            {/* Only show logout button if user is logged in */}
            {isAuthenticated && (
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Hamburger */}
          {/* Display only when user is logged in */}
          {isAuthenticated && (
            <div
              className="lg:hidden text-gray-300 cursor-pointer text-2xl"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              ☰
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {/* Display only when user is logged in */}
        {isAuthenticated && menuOpen && (
          <div className="lg:hidden bg-gray-800 px-4 py-3 space-y-3">
            {navbarLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  isActive
                    ? "block text-blue-400 font-semibold"
                    : "block text-gray-300 hover:text-blue-400"
                }
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </NavLink>
            ))}

            {/* Hamburger logout button */}
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition mt-2"
              onClick={() => {
                setMenuOpen(false);
                handleLogout();
              }}
            >
              Logout
            </button>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
