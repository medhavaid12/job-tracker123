import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs, deleteJob, updateJob, jobSelector } from "../redux/jobReducer";
import { Filter, Search, Download, CalendarDays, SlidersHorizontal } from "lucide-react";
import { axiosInstance } from "../lib/axios";
import JobCard from "../components/JobCard";

const Applications = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jobs, loading, error } = useSelector(jobSelector);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  useEffect(() => {
    let result = [...jobs];

    if (statusFilter !== "all") {
      result = result.filter((job) => job.status === statusFilter);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (job) =>
          job.title?.toLowerCase().includes(term) ||
          job.company?.name?.toLowerCase().includes(term)
      );
    }

    if (priorityFilter !== "all") {
      result = result.filter((job) => job.priority === priorityFilter);
    }

    if (dateFrom) {
      const from = new Date(dateFrom);
      result = result.filter((job) => job.appliedDate && new Date(job.appliedDate) >= from);
    }
    if (dateTo) {
      const to = new Date(dateTo);
      to.setHours(23, 59, 59, 999);
      result = result.filter((job) => job.appliedDate && new Date(job.appliedDate) <= to);
    }

    if (sortBy === "recent") {
      result.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    } else if (sortBy === "oldest") {
      result.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
    } else if (sortBy === "priority") {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      result.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }

    setFilteredJobs(result);
  }, [jobs, searchTerm, statusFilter, sortBy, priorityFilter, dateFrom, dateTo]);

  const handleStatusChange = (jobId, newStatus) => {
    const job = jobs.find((j) => j._id === jobId);
    if (job) {
      dispatch(updateJob({ jobId, jobData: { ...job, status: newStatus } }));
    }
  };

  const handleDelete = (jobId) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      dispatch(deleteJob(jobId));
    }
  };

  const handleUpdate = (job) => {
    navigate(`/edit-job/${job._id}`);
  };

  const handleExportJSON = async () => {
    try {
      const { data } = await axiosInstance.get("jobs/export?format=json");
      const blob = new Blob([JSON.stringify(data.response, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "jobs.json";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert("Export failed: " + err.message);
    }
  };

  const handleExportCSV = async () => {
    try {
      const response = await axiosInstance.get("jobs/export?format=csv", { responseType: "blob" });
      const blob = new Blob([response.data], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "jobs.csv";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert("Export failed: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">All Applications</h1>
          <p className="text-gray-400">Manage and track your job applications</p>
        </div>

        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search by job title or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          <div className="flex gap-4 flex-wrap items-center">
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-2.5 text-gray-100 focus:outline-none focus:border-blue-500 transition cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="saved">Saved</option>
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
                <option value="withdrawn">Withdrawn</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <SlidersHorizontal size={18} className="text-gray-400" />
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-2.5 text-gray-100 focus:outline-none focus:border-blue-500 transition cursor-pointer"
              >
                <option value="all">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-2.5 text-gray-100 focus:outline-none focus:border-blue-500 transition cursor-pointer"
            >
              <option value="recent">Most Recent</option>
              <option value="oldest">Oldest First</option>
              <option value="priority">By Priority</option>
            </select>

            <div className="flex items-center gap-2 ml-auto">
              <CalendarDays size={16} className="text-gray-400" />
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-gray-100 focus:outline-none focus:border-blue-500 transition text-sm"
                title="From date"
              />
              <span className="text-gray-500">-</span>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-gray-100 focus:outline-none focus:border-blue-500 transition text-sm"
                title="To date"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleExportJSON}
                className="flex items-center gap-1 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-300 transition"
                title="Export JSON"
              >
                <Download size={14} />
                JSON
              </button>
              <button
                onClick={handleExportCSV}
                className="flex items-center gap-1 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-300 transition"
                title="Export CSV"
              >
                <Download size={14} />
                CSV
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-10">
            <p className="text-gray-400">Loading applications...</p>
          </div>
        ) : error ? (
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 text-red-300">
            Error: {error}
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center">
            <p className="text-gray-400">No applications found</p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-400">
              Showing {filteredJobs.length} of {jobs.length} applications
            </p>
            {filteredJobs.map((job) => (
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
  );
};

export default Applications;
