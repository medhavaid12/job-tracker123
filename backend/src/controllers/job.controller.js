import validateUserInput from "../lib/validators.js";
import JobRepository from "../repositories/job.repository.js";
import JobModel from "../models/job.model.js";

export default class JobController {
  constructor() {
    this.jobRepository = new JobRepository();
  }

  // Get job stats for dashboard
  async getJobStats(req, res, next) {
    const userId = req.user.id;
    try {
      const stats = await JobModel.aggregate([
        { $match: { createdBy: userId } },
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
      ]);

      const total = await JobModel.countDocuments({ createdBy: userId });

      const statusMap = {
        saved: 0,
        applied: 0,
        interview: 0,
        offer: 0,
        rejected: 0,
        withdrawn: 0,
      };

      stats.forEach((item) => {
        statusMap[item._id] = item.count;
      });

      res.status(200).json({
        status: "success",
        response: { total, ...statusMap },
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  // Get recent jobs
  async getRecentJobs(req, res, next) {
    const userId = req.user.id;
    try {
      const jobs = await JobModel.find({ createdBy: userId })
        .sort({ updatedAt: -1 })
        .limit(5);

      res.status(200).json({ status: "success", response: jobs });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  // Get all user jobs
  async getAllUserJobs(req, res, next) {
    const userId = req.user.id;
    try {
      const result = await this.jobRepository.getAll(userId);

      if (result.length === 0) {
        return res
          .status(200)
          .json({ status: "success", message: "No saved jobs found", response: [] });
      }

      res.status(200).json({ status: "success", response: result });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  // Get Job
  async getAUserJob(req, res, next) {
    const userId = req.user.id;
    const { jobId } = req.params;

    if (!jobId || jobId === ":jobId") {
      return res
        .status(400)
        .json({ status: "failed", message: "jobId is required" });
    }

    try {
      const result = await this.jobRepository.getOne(userId, jobId);

      if (!result) {
        return res.status(404).json({ status: "failed", message: "Not found" });
      }

      res.status(200).json({ status: "success", response: result });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  // Add Job
  async addJob(req, res, next) {
    const userId = req.user.id;
    const jobData = req.body;

    // User Input validation
    const validationError = validateUserInput(jobData, [
      "title",
      "company.name",
    ]);
    if (validationError) {
      return res
        .status(400)
        .json({ status: "failed", message: validationError });
    }

    try {
      const result = await this.jobRepository.add(userId, jobData);

      if (!result) {
        return res
          .status(400)
          .json({ status: "failed", message: "Failed to add job" });
      }

      res.status(201).json({ status: "success", response: result });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  // Update Job
  async updateJob(req, res, next) {
    const userId = req.user.id;
    const { jobId } = req.params;
    const jobData = req.body;

    if (!jobId || jobId === ":jobId") {
      return res
        .status(400)
        .json({ status: "failed", message: "Missing required fields" });
    }

    try {
      const result = await this.jobRepository.update(userId, jobId, jobData);

      if (!result) {
        return res
          .status(404)
          .json({ status: "failed", message: "Job not found" });
      }

      res.status(200).json({ status: "success", response: result });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  // Delete Job
  async deleteJob(req, res, next) {
    const userId = req.user.id;
    const { jobId } = req.params;

    if (!jobId || jobId === ":jobId") {
      return res
        .status(400)
        .json({ status: "failed", message: "Missing required fields." });
    }

    try {
      const result = await this.jobRepository.delete(userId, jobId);

      if (!result) {
        return res
          .status(404)
          .json({ status: "failed", message: "Job not found" });
      }

      res
        .status(200)
        .json({ status: "success", message: "Job deleted successfully" });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  // Export jobs
  async exportJobs(req, res, next) {
    const userId = req.user.id;
    const { format = "json" } = req.query;
    try {
      const jobs = await JobModel.find({ createdBy: userId }).lean();
      
      if (format === "csv") {
        const headers = [
          "Title", "Company", "Location", "Status", "Priority",
          "Employment Type", "Work Location", "Salary", "Applied Date",
          "Deadline", "Job URL", "Overview", "Notes"
        ];
        const rows = jobs.map((job) => [
          `"${(job.title || "").replace(/"/g, '""')}"`,
          `"${(job.company?.name || "").replace(/"/g, '""')}"`,
          `"${(job.location || "").replace(/"/g, '""')}"`,
          job.status || "",
          job.priority || "",
          job.employment_type || "",
          job.work_location_type || "",
          `"${(job.salary || "").replace(/"/g, '""')}"`,
          job.appliedDate ? new Date(job.appliedDate).toISOString().split("T")[0] : "",
          job.deadline ? new Date(job.deadline).toISOString().split("T")[0] : "",
          `"${(job.jobUrl || "").replace(/"/g, '""')}"`,
          `"${(job.overview || "").replace(/"/g, '""')}"`,
          `"${(job.notes || "").replace(/"/g, '""')}"`,
        ]);
        const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attachment; filename=jobs.csv");
        return res.status(200).send(csv);
      }
      
      res.status(200).json({ status: "success", response: jobs });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
