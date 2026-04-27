import { useState } from "react";
import {
  MapPin,
  Building2,
  Calendar,
  DollarSign,
  ExternalLink,
  Pencil,
  Trash2,
  ChevronDown,
  ChevronUp,
  Briefcase,
} from "lucide-react";
import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";

export default function JobCard({ job, onUpdate, onDelete, onStatusChange }) {
  const [expanded, setExpanded] = useState(false);
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);

  const statusOptions = ["saved", "applied", "interview", "offer", "rejected", "withdrawn"];

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5 hover:border-gray-600 transition-all">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-1">{job.title}</h3>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Building2 size={14} />
            <span>{job.company?.name}</span>
            <span className="text-gray-600">|</span>
            <MapPin size={14} />
            <span>{job.location || "Remote/Unspecified"}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <PriorityBadge priority={job.priority} />
          <div className="relative">
            <button
              onClick={() => setStatusMenuOpen(!statusMenuOpen)}
              className="focus:outline-none"
            >
              <StatusBadge status={job.status} />
            </button>
            {statusMenuOpen && (
              <div className="absolute right-0 top-8 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10 min-w-[140px]">
                {statusOptions.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      onStatusChange(job._id, s);
                      setStatusMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-700 transition capitalize text-gray-300"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Info */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-3">
        {job.employment_type && (
          <span className="flex items-center gap-1">
            <Briefcase size={14} />
            {job.employment_type}
          </span>
        )}
        {job.salary && (
          <span className="flex items-center gap-1">
            <DollarSign size={14} />
            {job.salary}
          </span>
        )}
        {job.appliedDate && (
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            Applied: {formatDate(job.appliedDate)}
          </span>
        )}
      </div>

      {/* Expanded Content */}
      {expanded && (
        <div className="mt-4 pt-4 border-t border-gray-700 space-y-3">
          {job.overview && (
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-1">Overview</h4>
              <p className="text-sm text-gray-400">{job.overview}</p>
            </div>
          )}
          {job.qualifications_and_skills?.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-1">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {job.qualifications_and_skills.map((skill, i) => (
                  <span key={i} className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          {job.notes && (
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-1">Notes</h4>
              <p className="text-sm text-gray-400">{job.notes}</p>
            </div>
          )}
          {job.deadline && (
            <div className="text-sm text-gray-400">
              Deadline: {formatDate(job.deadline)}
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-between items-center mt-3">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-sm text-gray-400 hover:text-blue-400 transition"
        >
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          {expanded ? "Less details" : "More details"}
        </button>

        <div className="flex items-center gap-3">
          {job.jobUrl && (
            <a
              href={job.jobUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition"
              title="Open job posting"
            >
              <ExternalLink size={18} />
            </a>
          )}
          <button
            onClick={() => onUpdate(job)}
            className="text-gray-400 hover:text-yellow-400 transition"
            title="Edit"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={() => onDelete(job._id)}
            className="text-gray-400 hover:text-red-400 transition"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

