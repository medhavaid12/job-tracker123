import ParserRepository from "../repositories/parser.repository.js";

export default class ParserController {
  constructor() {
    this.parserRepository = new ParserRepository();
  }

  async parseData(req, res, next) {
    const data = req.body;
    try {
      const result = await this.parserRepository.parseData(data);

      if (!result)
        return res.status(500).json({
          status: "failed",
          message: "Something went wrong. Try again later!",
        });

      res.status(200).json({ status: "success", response: result });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
