import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, default: "", trim: true },
    location: { type: String, default: "" },
    posted_ago: { type: String, default: "" }, // convert posted ago to posted on using string to time conversion.
    applicants_count: { type: String, default: "" },
    employment_type: { type: String, default: "" },
    work_location_type: { type: String, default: "" },
    overview: { type: String, default: "" },
    qualifications_and_skills: [{ type: String }],
    roles_and_responsibilities: [{ type: String }],
    company: {
      name: { type: String, default: "", trim: true },
      industry: { type: String, default: "" },
      employee_count: { type: String, default: "" },
      linkedin_followers: { type: String, default: "" },
      description: { type: String, default: "" },
      headquarters_location: { type: String, default: "" },
    },
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
