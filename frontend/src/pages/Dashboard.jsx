import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchJobStats, fetchRecentJobs, updateJob, deleteJob, jobSelector } from "../redux/jobReducer";
import { authSelector } from "../redux/authReducer";
import {
  Briefcase,
  Send,
  CalendarCheck,
  Trophy,
  XCircle,
  TrendingUp,
  Plus,
  ArrowRight,
} from "lucide-react";
import JobCard from "../components/JobCard";

const statCards = [
  { key: "total", label: "Total Jobs", icon: Briefcase, color: "text-blue-400", bg: "bg-blue-500/10" },
  { key: "applied", label: "Applied", icon: Send, color: "text-indigo-400", bg: "bg-indigo-500/10" },
  { key: "interview", label: "Interviews", icon: CalendarCheck, color: "text-yellow-400", bg: "bg-yellow-500/10" },
  { key: "offer", label: "Offers", icon: Trophy, color: "text-green-400", bg: "bg-green-500/10" },
  { key: "rejected", label: "Rejected", icon: XCircle, color: "text-red-400", bg: "bg-red-500/10" },
];

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(authSelector);
  const { stats, recentJobs, loading, jobs } = useSelector(jobSelector);

  useEffect(() => {
    dispatch(fetchJobStats());
    dispatch(fetchRecentJobs());
  }, [dispatch]);

  const handleStatusChange = (jobId, newStatus) => {
    const job = jobs.find((j) => j._id === jobId);
    if (job) {
      dispatch(updateJob({ jobId, jobData: { ...job, status: newStatus } }));
    }
  };

  const handleUpdate = (job) => {
    navigate("/applications");
  };

  const handleDelete = (jobId) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      dispatch(deleteJob(jobId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1">
            Welcome back, {user?.firstName || "Job Seeker"}!
          </h1>
          <p className="text-gray-400">
            Here is your job search overview.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {statCards.map(({ key, label, icon: Icon, color, bg }) => (
            <div
              key={key}
              className="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-gray-700 transition"
            >
              <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center mb-3`}>
                <Icon size={20} className={color} />
              </div>
              <div className="text-2xl font-bold">{stats?.[key] ?? 0}</div>
              <div className="text-sm text-gray-400">{label}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => navigate("/add-job")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg transition font-medium"
          >
            <Plus size={18} />
            Add New Job
          </button>
          <button
            onClick={() => navigate("/applications")}
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-200 px-5 py-2.5 rounded-lg transition font-medium"
          >
            <TrendingUp size={18} />
            View All Applications
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          {loading ? (
            <div className="text-gray-400">Loading...</div>
          ) : recentJobs.length === 0 ? (
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center">
              <Briefcase size={48} className="mx-auto text-gray-600 mb-3" />
              <p className="text-gray-400 mb-4">No jobs tracked yet. Start by adding your first job!</p>
              <button
                onClick={() => navigate("/add-job")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              >
                Add Job
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {recentJobs.map((job) => (
                <JobCard
                  key={job._id}
                  job={job}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

