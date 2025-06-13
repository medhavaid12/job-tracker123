import geminiParser from "../lib/geminiAI.js";

export default class ParserRepository {
  async parseData(data) {
    try {
      const result = await geminiParser(data);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
