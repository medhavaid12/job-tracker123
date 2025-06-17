import geminiParser from "../lib/geminiAI.js";
import JobModel from "../models/parser.model.js";

export default class ParserRepository {
  async parseData(data) {
    try {
      const result = await geminiParser(data);
      const jobData = JSON.parse(result);

      const newJob = new JobModel(jobData);
      await newJob.save();

      return newJob;
    } catch (error) {
      throw new Error(`ParserRepository Error: ${error.message}`);
    }
  }
}
