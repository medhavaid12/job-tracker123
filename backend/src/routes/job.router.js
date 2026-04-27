import express from "express";
import jwtAuth from "../middlewares/jwtAuth.js";
import JobController from "../controllers/job.controller.js";

const jobRouter = express.Router();
const jobController = new JobController();

jobRouter.get("/stats", jwtAuth, (req, res, next) => {
  jobController.getJobStats(req, res, next);
});

jobRouter.get("/recent", jwtAuth, (req, res, next) => {
  jobController.getRecentJobs(req, res, next);
});

jobRouter.get("/all", jwtAuth, (req, res, next) => {
  jobController.getAllUserJobs(req, res, next);
});

jobRouter.get("/export", jwtAuth, (req, res, next) => {
  jobController.exportJobs(req, res, next);
});

jobRouter.get("/:jobId", jwtAuth, (req, res, next) => {
  jobController.getAUserJob(req, res, next);
});

jobRouter.post("/addJob", jwtAuth, (req, res, next) => {
  jobController.addJob(req, res, next);
});

jobRouter.put("/updateJob/:jobId", jwtAuth, (req, res, next) => {
  jobController.updateJob(req, res, next);
});

jobRouter.delete("/:jobId", jwtAuth, (req, res, next) => {
  jobController.deleteJob(req, res, next);
});

export default jobRouter;
