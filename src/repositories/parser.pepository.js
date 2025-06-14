import geminiParser from "../lib/geminiAI.js";
import JobModel from "../models/parser.model.js";

export default class ParserRepository {
  async parseData(data) {
    try {
      const result = await geminiParser(data);
      const newJob = new JobModel(JSON.parse(result));
      newJob.save();

      return newJob;
    } catch (error) {
      console.log(error);
    }
  }
}
