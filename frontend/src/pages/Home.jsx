import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { authSelector } from "../redux/authReducer";
import { Briefcase, TrendingUp, Clock, Target, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Briefcase,
    title: "Smart Job Tracking",
    description: "Track all your job applications in one place with detailed information and notes.",
  },
  {
    icon: TrendingUp,
    title: "Progress Analytics",
    description: "Visualize your job search progress with charts and statistics.",
  },
  {
    icon: Clock,
    title: "Timeline Management",
    description: "Keep track of deadlines and follow-ups with ease.",
  },
  {
    icon: Target,
    title: "Priority Tracking",
    description: "Mark jobs as high, medium, or low priority to focus on what matters.",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(authSelector);

  if (isAuthenticated && user) {
    // Redirect to dashboard if already logged in
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          <h1 className="text-3xl font-bold mb-4">Welcome back, {user.firstName}!</h1>
          <p className="text-gray-400 mb-8">Redirecting to your dashboard...</p>
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition font-medium"
          >
            Go to Dashboard
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Hero Section */}
      <div className="px-6 py-20 md:py-32 max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Track Your <span className="text-blue-400">Job Search</span> Effortlessly
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Stay organized, track your applications, and land your dream job with our intuitive job tracking platform.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate("/signup")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition font-medium"
          >
            Get Started
            <ArrowRight size={20} />
          </button>
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-200 px-8 py-3 rounded-lg transition font-medium"
          >
            Sign In
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-6 py-20 bg-gray-900/50 border-y border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Job Tracker?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition"
                >
                  <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4">
                    <Icon size={24} className="text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-6 py-20 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to organize your job search?</h2>
        <p className="text-xl text-gray-400 mb-8">Join thousands of job seekers using Job Tracker to manage their applications.</p>
        <button
          onClick={() => navigate("/signup")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition font-medium"
        >
          Start for Free
        </button>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-800 px-6 py-8 text-center text-gray-400 text-sm">
        <p>&copy; 2024 Job Tracker. Built for job seekers, by job seekers.</p>
      </div>
    </div>
  );
};

export default Home;
