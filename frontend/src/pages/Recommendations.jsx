import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { jobSelector } from "../redux/jobReducer";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Briefcase,
  Building2,
  MapPin,
  DollarSign,
  ArrowLeft,
  TrendingUp,
  Star,
} from "lucide-react";

const MOCK_JOBS = [
  {
    id: "rec-1",
    title: "Senior Full Stack Developer",
    company: { name: "TechCorp", industry: "Technology" },
    location: "Remote",
    salary: "$130,000 - $170,000",
    employment_type: "Full-time",
    work_location_type: "Remote",
    matching_skills: ["React", "Node.js", "MongoDB"],
    reason: "Matches 3 of your top skills",
    posted_ago: "2 days ago",
  },
  {
    id: "rec-2",
    title: "Frontend Engineering Lead",
    company: { name: "InnovateLabs", industry: "Software" },
    location: "San Francisco, CA",
    salary: "$150,000 - $190,000",
    employment_type: "Full-time",
    work_location_type: "Hybrid",
    matching_skills: ["React", "TypeScript"],
    reason: "High skill overlap with your profile",
    posted_ago: "5 days ago",
  },
  {
    id: "rec-3",
    title: "Backend Engineer - Cloud Platform",
    company: { name: "CloudScale", industry: "Cloud Computing" },
    location: "Austin, TX",
    salary: "$120,000 - $160,000",
    employment_type: "Full-time",
    work_location_type: "On-site",
    matching_skills: ["Node.js", "MongoDB", "AWS"],
    reason: "Strong backend skill alignment",
    posted_ago: "1 week ago",
  },
  {
    id: "rec-4",
    title: "DevOps and Infrastructure Engineer",
    company: { name: "OpsFlow", industry: "Infrastructure" },
    location: "Remote",
    salary: "$125,000 - $165,000",
    employment_type: "Contract",
    work_location_type: "Remote",
    matching_skills: ["AWS", "Docker", "CI/CD"],
    reason: "Expands your infrastructure skills",
    posted_ago: "3 days ago",
  },
  {
    id: "rec-5",
    title: "Product Engineer",
    company: { name: "ProductFirst", industry: "SaaS" },
    location: "New York, NY",
    salary: "$140,000 - $180,000",
    employment_type: "Full-time",
    work_location_type: "Hybrid",
    matching_skills: ["React", "TypeScript", "Node.js"],
    reason: "Top match for your full-stack profile",
    posted_ago: "1 day ago",
  },
  {
    id: "rec-6",
    title: "Staff Software Engineer",
    company: { name: "BigTech Inc", industry: "Technology" },
    location: "Seattle, WA",
    salary: "$180,000 - $240,000",
    employment_type: "Full-time",
    work_location_type: "Hybrid",
    matching_skills: ["React", "Node.js", "MongoDB", "System Design"],
    reason: "Excellent overall skill match",
    posted_ago: "4 days ago",
  },
];

const Recommendations = () => {
  const navigate = useNavigate();
  const { jobs } = useSelector(jobSelector);
  const [userSkills, setUserSkills] = useState([]);
  const [filteredRecs, setFilteredRecs] = useState(MOCK_JOBS);

  useEffect(() => {
    const allSkills = new Set();
    jobs.forEach((job) => {
      if (Array.isArray(job.qualifications_and_skills)) {
        job.qualifications_and_skills.forEach((skill) =>
          allSkills.add(skill.toLowerCase())
        );
      }
    });
    const skills = Array.from(allSkills);
    setUserSkills(skills);

    if (skills.length > 0) {
      const scored = MOCK_JOBS.map((job) => {
        const matchCount = job.matching_skills.filter((s) =>
          skills.includes(s.toLowerCase())
        ).length;
        return { ...job, score: matchCount };
      });
      scored.sort((a, b) => b.score - a.score);
      setFilteredRecs(scored);
    }
  }, [jobs]);

  const handleAddJob = (rec) => {
    navigate("/add-job", {
      state: {
        title: rec.title,
        company: rec.company,
        location: rec.location,
        salary: rec.salary,
        employment_type: rec.employment_type,
        work_location_type: rec.work_location_type,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-4"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="text-yellow-400" size={28} />
            <h1 className="text-3xl font-bold">Job Recommendations</h1>
          </div>
          <p className="text-gray-400">
            Personalized opportunities based on your tracked skills
          </p>
        </div>

        {userSkills.length > 0 && (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-6">
            <h3 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
              <TrendingUp size={16} />
              Your Tracked Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {userSkills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs bg-blue-900/30 text-blue-300 px-3 py-1.5 rounded-full border border-blue-800"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRecs.map((job) => (
            <div
              key={job.id}
              className="bg-gray-800/50 border border-gray-700 rounded-xl p-5 hover:border-blue-500/50 transition-all"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {job.title}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Building2 size={14} />
                    <span>{job.company.name}</span>
                    <span className="text-gray-600">|</span>
                    <MapPin size={14} />
                    <span>{job.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-yellow-400 text-sm">
                  <Star size={14} />
                  <span className="font-medium">{job.matching_skills.length}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 text-sm text-gray-400 mb-3">
                <span className="flex items-center gap-1">
                  <Briefcase size={14} />
                  {job.employment_type}
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign size={14} />
                  {job.salary}
                </span>
                <span className="text-gray-500">{job.posted_ago}</span>
              </div>

              <div className="mb-3">
                <p className="text-sm text-blue-300">{job.reason}</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {job.matching_skills.map((skill) => (
                    <span
                      key={skill}
                      className={`text-xs px-2 py-0.5 rounded ${
                        userSkills.includes(skill.toLowerCase())
                          ? "bg-green-900/30 text-green-300 border border-green-800"
                          : "bg-gray-700/50 text-gray-400"
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleAddJob(job)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition text-sm font-medium"
              >
                Track This Job
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
