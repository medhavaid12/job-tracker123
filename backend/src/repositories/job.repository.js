import JobModel from "../models/job.model.js";

export default class JobRepository {
  // Get all jobs
  async getAll(userId) {
    try {
      const allJobs = await JobModel.find({ createdBy: userId });
      return allJobs;
    } catch (error) {
      console.error(error);
      throw new Error(`Get All User Jobs Failed: ${error.message}`);
    }
  }

  // Get job
  async getOne(userId, jobId) {
    try {
      const job = await JobModel.findOne({ _id: jobId, createdBy: userId });
      return job;
    } catch (error) {
      console.error(error);
      throw new Error(`Get User Job Failed: ${error.message}`);
    }
  }

  // Add job
  async add(userId, jobData) {
    try {
      const newJob = new JobModel({ ...jobData, createdBy: userId });
      await newJob.save();
      return newJob;
    } catch (error) {
      console.error(error);
      throw new Error(`Add Job Failed: ${error.message}`);
    }
  }

  // Update job
  async update(userId, jobId, jobData) {
    try {
      const updatedJob = await JobModel.findOneAndUpdate(
        { _id: jobId, createdBy: userId },
        {
          $set: jobData,
        },
        { new: true }
      );

      return updatedJob;
    } catch (error) {
      console.error(error);
      throw new Error(`Update Job Failed: ${error.message}`);
    }
  }

  async delete(userId, jobId) {
    try {
      const deletedJob = await JobModel.findOneAndDelete({
        _id: jobId,
        createdBy: userId,
      });
      return deletedJob;
    } catch (error) {
      console.error(error);
      throw new Error(`Delete Job Failed: ${error.message}`);
    }
  }
}
