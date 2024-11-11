import express from "express";
import { openAPIRouter } from "../config/open-api-router";
import { bookRouter } from "./books.routes";
import { healthCheckRouter } from "./healtk-check.routes";

const API_VERSION = process.env.API_VERSION ?? 1;

const router = express.Router();

router.use(openAPIRouter);

router.get("/api/v1", (_req, res) => {
  res.json({
    success: true,
    message: "It Works!",
    data: [],
  });
});

router.use(`/api/v${API_VERSION}/books`, bookRouter);
router.use(`/api/v${API_VERSION}/health-check`, healthCheckRouter);

export default router;
