import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs, deleteJob, updateJob, jobSelector } from "../redux/jobReducer";
import { Folder, Send, CalendarCheck, Trophy, XCircle } from "lucide-react";
import JobCard from "../components/JobCard";

const statusGroups = [
  { key: "saved", label: "Saved", icon: Folder, color: "text-gray-400", bg: "bg-gray-500/10" },
  { key: "applied", label: "Applied", icon: Send, color: "text-blue-400", bg: "bg-blue-500/10" },
  { key: "interview", label: "In Interview", icon: CalendarCheck, color: "text-yellow-400", bg: "bg-yellow-500/10" },
  { key: "offer", label: "Offers", icon: Trophy, color: "text-green-400", bg: "bg-green-500/10" },
  { key: "rejected", label: "Rejected", icon: XCircle, color: "text-red-400", bg: "bg-red-500/10" },
];

const SavedJobs = () => {
  const dispatch = useDispatch();
  const { jobs, loading } = useSelector(jobSelector);
  const [jobsByStatus, setJobsByStatus] = useState({});

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  useEffect(() => {
    const grouped = {
      saved: [],
      applied: [],
      interview: [],
      offer: [],
      rejected: [],
      withdrawn: [],
    };

    jobs.forEach((job) => {
      if (grouped[job.status]) {
        grouped[job.status].push(job);
      }
    });

    setJobsByStatus(grouped);
  }, [jobs]);

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
    console.log("Edit job:", job);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Saved Jobs</h1>
          <p className="text-gray-400">Organize your job applications by status</p>
        </div>

        {loading ? (
          <div className="text-center py-10">
            <p className="text-gray-400">Loading jobs...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {statusGroups.map(({ key, label, icon: Icon, color, bg }) => (
              <div key={key}>
                {/* Status Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center`}>
                    <Icon size={20} className={color} />
                  </div>
                  <h2 className="text-xl font-semibold">{label}</h2>
                  <span className="ml-auto text-sm text-gray-400 bg-gray-800 px-3 py-1 rounded-full">
                    {jobsByStatus[key]?.length || 0}
                  </span>
                </div>

                {/* Jobs in Status */}
                {jobsByStatus[key]?.length === 0 ? (
                  <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 text-center text-gray-400">
                    No jobs with this status
                  </div>
                ) : (
                  <div className="space-y-3 ml-8">
                    {jobsByStatus[key]?.map((job) => (
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedJobs;
