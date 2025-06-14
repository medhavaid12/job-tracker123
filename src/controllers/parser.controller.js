import ParserRepository from "../repositories/parser.pepository.js";

export default class ParserController {
  constructor() {
    this.parserRepository = new ParserRepository();
  }

  async parseData(req, res, next) {
    try {
      const result = await this.parserRepository.parseData(req.body);

      if (!result)
        return res.status(500).json({
          status: "failed",
          message: "Something went wrong. Try again later!",
        });

      console.log(result);
      res.status(200).json({ status: "success", response: result });
    } catch (error) {
      console.log(error);
    }
  }
}
