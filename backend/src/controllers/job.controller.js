import validateUserInput from "../lib/validators.js";
import JobRepository from "../repositories/job.repository.js";

export default class JobController {
  constructor() {
    this.jobRepository = new JobRepository();
  }

  // Get all user jobs
  async getAllUserJobs(req, res, next) {
    const userId = req.user.id;
    try {
      const result = await this.jobRepository.getAll(userId);

      if (result.length === 0) {
        return res
          .status(200)
          .json({ status: "success", message: "No saved jobs found" });
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
      "location",
      "overview",
      "company.name",
      "company.industry",
      "company.description",
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

      res.status(200).json({ status: "success", response: result });
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
        .json({ status: "success", messgae: "Job deleted successfully" });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
