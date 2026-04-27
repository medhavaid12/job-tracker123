import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateJob, jobSelector } from "../redux/jobReducer";
import { ArrowLeft } from "lucide-react";

const EditJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jobId } = useParams();
  const { jobs, loading, error } = useSelector(jobSelector);

  const [formData, setFormData] = useState({
    title: "",
    company: { name: "", industry: "", description: "" },
    location: "",
    employment_type: "",
    work_location_type: "",
    salary: "",
    jobUrl: "",
    overview: "",
    notes: "",
    priority: "medium",
    status: "saved",
    qualifications_and_skills: "",
    appliedDate: "",
    deadline: "",
  });

  useEffect(() => {
    const job = jobs.find((j) => j._id === jobId);
    if (job) {
      setFormData({
        title: job.title || "",
        company: {
          name: job.company?.name || "",
          industry: job.company?.industry || "",
          description: job.company?.description || "",
        },
        location: job.location || "",
        employment_type: job.employment_type || "",
        work_location_type: job.work_location_type || "",
        salary: job.salary || "",
        jobUrl: job.jobUrl || "",
        overview: job.overview || "",
        notes: job.notes || "",
        priority: job.priority || "medium",
        status: job.status || "saved",
        qualifications_and_skills: Array.isArray(job.qualifications_and_skills)
          ? job.qualifications_and_skills.join(", ")
          : "",
        appliedDate: job.appliedDate
          ? new Date(job.appliedDate).toISOString().split("T")[0]
          : "",
        deadline: job.deadline
          ? new Date(job.deadline).toISOString().split("T")[0]
          : "",
      });
    }
  }, [jobs, jobId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("company.")) {
      const field = name.replace("company.", "");
      setFormData({
        ...formData,
        company: { ...formData.company, [field]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jobData = {
      ...formData,
      qualifications_and_skills: formData.qualifications_and_skills
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s),
      appliedDate: formData.appliedDate || null,
      deadline: formData.deadline || null,
    };
    const result = await dispatch(updateJob({ jobId, jobData }));
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/applications");
    }
  };

  if (!jobs.find((j) => j._id === jobId)) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100 p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Job not found</p>
          <button
            onClick={() => navigate("/applications")}
            className="text-blue-400 hover:text-blue-300"
          >
            Back to Applications
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/applications")}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-4"
          >
            <ArrowLeft size={20} />
            Back to Applications
          </button>
          <h1 className="text-3xl font-bold mb-2">Edit Job</h1>
          <p className="text-gray-400">Update job details</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 text-red-300">
              {error}
            </div>
          )}

          {/* Job Title and Company */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Job Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2.5 text-gray-100 focus:outline-none focus:border-blue-500 transition"
                placeholder="e.g. Senior React Developer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                name="company.name"
                value={formData.company.name}
                onChange={handleChange}
                required
                className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2.5 text-gray-100 focus:outline-none focus:border-blue-500 transition"
                placeholder="e.g. Google"
              />
            </div>
          </div>

          {/* Location and Work Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2.5 text-gray-100 focus:outline-none focus:border-blue-500 transition"
                placeholder="e.g. San Francisco, CA"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Work Location Type
              </label>
              <select
                name="work_location_type"
                value={formData.work_location_type}
                onChange={handleChange}
                className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2.5 text-gray-100 focus:outline-none focus:border-blue-500 transition cursor-pointer"
              >
                <option value="">Select...</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>
          </div>

          {/* Employment Type and Salary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Employment Type
              </label>
              <select
                name="employment_type"
                value={formData.employment_type}
                onChange={handleChange}
                className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2.5 text-gray-100 focus:outline-none focus:border-blue-500 transition cursor-pointer"
              >
                <option value="">Select...</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Temporary">Temporary</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Salary
              </label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2.5 text-gray-100 focus:outline-none focus:border-blue-500 transition"
                placeholder="e.g. $80,000 - $120,000"
              />
            </div>
          </div>

          {/* Status and Priority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2.5 text-gray-100 focus:outline-none focus:border-blue-500 transition cursor-pointer"
              >
                <option value="saved">Saved</option>
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
                <option value="withdrawn">Withdrawn</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2.5 text-gray-100 focus:outline-none focus:border-blue-500 transition cursor-pointer"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Applied Date
              </label>
              <input
                type="date"
                name="appliedDate"
                value={formData.appliedDate}
                onChange={handleChange}
                className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2.5 text-gray-100 focus:outline-none focus:border-blue-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Application Deadline
              </label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2.5 text-gray-100 focus:outline-none focus:border-blue-500 transition"
              />
            </div>
          </div>

          {/* Company Industry */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Company Industry
            </label>
            <input
              type="text"
              name="company.industry"
              value={formData.company.industry}
              onChange={handleChange}
              className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2.5 text-gray-100 focus:outline-none focus:border-blue-500 transition"
              placeholder="e.g. Technology"
            />
          </div>

          {/* Job URL */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Job Posting URL
            </label>
            <input
              type="url"
              name="jobUrl"
              value={formData.jobUrl}
              onChange={handleChange}
              className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2.5 text-gray-100 focus:outline-none focus:border-blue-500 transition"
              placeholder="https://example.com/job"
            />
          </div>

          {/* Overview */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Job Overview
            </label>
            <textarea
              name="overview"
              value={formData.overview}
              onChange={handleChange}
              rows="3"
              className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2.5 text-gray-100 focus:outline-none focus:border-blue-500 transition resize-none"
              placeholder="Describe the job position..."
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Required Skills (comma separated)
            </label>
            <input
              type="text"
              name="qualifications_and_skills"
              value={formData.qualifications_and_skills}
              onChange={handleChange}
              className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2.5 text-gray-100 focus:outline-none focus:border-blue-500 transition"
              placeholder="e.g. React, Node.js, MongoDB"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Personal Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2.5 text-gray-100 focus:outline-none focus:border-blue-500 transition resize-none"
              placeholder="Add any personal notes..."
            />
          </div>

          {/* Submit */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/applications")}
              className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-200 px-6 py-2.5 rounded-lg transition font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJob;

