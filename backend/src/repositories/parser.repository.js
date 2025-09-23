import geminiParser from "../lib/geminiAI.js";
import UserModel from "../models/auth.model.js";
import JobModel from "../models/parser.model.js";

export default class ParserRepository {
  async parseData(data, userId) {
    try {
      const result = await geminiParser(data);
      const jobData = JSON.parse(result);

      let jobDoc = await JobModel.findOne({
        "job.title": jobData.job.title,
        "company.name": jobData.company.name,
      });

      if (!jobDoc) {
        jobDoc = new JobModel(jobData);
        await jobDoc.save();
      }

      const updatedDocument = await UserModel.findByIdAndUpdate(
        userId,
        {
          $addToSet: {
            savedJobs: jobDoc._id,
          },
        },
        { returnDocument: "after" }
      );
      return updatedDocument;
    } catch (error) {
      throw new Error(`ParserRepository Error: ${error.message}`);
    }
  }
}
