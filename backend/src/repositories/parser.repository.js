import geminiParser from "../lib/geminiAI.js";
import JobModel from "../models/job.model.js";

export default class ParserRepository {
  async parseData(data, userId) {
    try {
      // Await for AI to parse data
      const result = await geminiParser(data);
      const jobData = JSON.parse(result);

      // Check if it already exists
      let jobDoc = await JobModel.findOne({
        ...result,
        createdBy: userId,
      });

      // Create new if it does not exist
      if (!jobDoc) {
        jobDoc = new JobModel({
          ...jobData,
          createdBy: userId,
        });
        await jobDoc.save();
      }

      return jobDoc;
    } catch (error) {
      throw new Error(`ParserRepository Error: ${error.message}`);
    }
  }
}
