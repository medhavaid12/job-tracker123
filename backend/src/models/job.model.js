import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    location: { type: String, default: "" },
    posted_ago: { type: String, default: "" },
    applicants_count: { type: String, default: "" },
    employment_type: { type: String, default: "" },
    work_location_type: { type: String, default: "" },
    overview: { type: String, default: "" },
    qualifications_and_skills: [{ type: String }],
    roles_and_responsibilities: [{ type: String }],
    company: {
      name: { type: String, required: true, trim: true },
      industry: { type: String, default: "" },
      employee_count: { type: String, default: "" },
      linkedin_followers: { type: String, default: "" },
      description: { type: String, default: "" },
      headquarters_location: { type: String, default: "" },
    },
    // New fields for advanced job tracking
    status: {
      type: String,
      enum: ["saved", "applied", "interview", "offer", "rejected", "withdrawn"],
      default: "saved",
    },
    salary: { type: String, default: "" },
    jobUrl: { type: String, default: "" },
    notes: { type: String, default: "" },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    deadline: { type: Date, default: null },
    appliedDate: { type: Date, default: null },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const JobModel = mongoose.model("Job", jobSchema);
export default JobModel;

