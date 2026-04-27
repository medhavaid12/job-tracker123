import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authSelector, logoutUser } from "../redux/authReducer";
import { User, Mail, LogOut, ArrowLeft } from "lucide-react";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(authSelector);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100 p-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-4"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold mb-2">Profile</h1>
          <p className="text-gray-400">Manage your account information</p>
        </div>

        {/* Profile Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 mb-6">
          {/* Avatar Section */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <User size={40} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-gray-400 mt-1">Job Application Tracker</p>
          </div>

          {/* User Details */}
          <div className="space-y-4 mb-8 pb-8 border-b border-gray-800">
            <div className="flex items-center gap-3 text-gray-300">
              <Mail size={20} className="text-blue-400" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Account Status */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold text-white">Account Status</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800 rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-1">Member Since</p>
                <p className="text-lg font-semibold text-white">
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-1">Account Type</p>
                <p className="text-lg font-semibold text-white">Free</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleLogout}
              className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg transition font-medium"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4 text-blue-300">
          <p className="text-sm">
            Need help? Contact support or check out the documentation to learn more about managing your job applications effectively.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
