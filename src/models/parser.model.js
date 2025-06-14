import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  job: {
    title: { type: String, default: "" },
    location: { type: String, default: "" },
    posted_ago: { type: String, default: "" },
    applicants_count: { type: String, default: "" },
    employment_type: { type: String, default: "" },
    work_location_type: { type: String, default: "" },
    skills_match_summary: { type: String, default: "" },
    overview: { type: String, default: "" },
    qualifications_and_skills: [{ type: String }],
    roles_and_responsibilities: [{ type: String }],
    desired_skills: [{ type: String }],
  },
  company: {
    name: { type: String, default: "" },
    industry: { type: String, default: "" },
    employee_count: { type: String, default: "" },
    linkedin_followers: { type: String, default: "" },
    description: { type: String, default: "" },
    headquarters_location: { type: String, default: "" },
  },
  applicant_insights: {
    employee_growth_rate: { type: String, default: "" },
    education_level_distribution: {
      bachelor_of_technology: { type: String, default: "" },
    },
    seniority_level_distribution: {
      entry_level: { type: String, default: "" },
    },
  },
});

const JobModel = mongoose.model("Job", jobSchema);
export default JobModel;
