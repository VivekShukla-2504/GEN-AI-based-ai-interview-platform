const express = require("express");

const { authUser } = require("../middlewares/auth.middleware");
const { upload } = require("../middlewares/file.middleware");

const interviewController = require("../controllers/interview.controller");

const interviewRouter = express.Router();

/* ---------------- CREATE INTERVIEW REPORT ---------------- */
interviewRouter.post(
    "/",
    authUser,
    upload.single("resume"),
    interviewController.generateInterViewReportController
);

/* ---------------- GET SINGLE REPORT ---------------- */
interviewRouter.get(
    "/report/:interviewId",
    authUser,
    interviewController.getInterviewReportByIdController
);

/* ---------------- GET ALL REPORTS ---------------- */
interviewRouter.get(
    "/",
    authUser,
    interviewController.getAllInterviewReportsController
);

/* ---------------- GENERATE RESUME PDF ---------------- */
interviewRouter.get(
    "/resume/pdf/:interviewReportId",
    authUser,
    interviewController.generateResumePdfController
);

module.exports = interviewRouter;