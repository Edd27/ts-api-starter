import express from "express";
import { ENV } from "../config/env";
import { bookRouter } from "./books.routes";
import { healthCheckRouter } from "./health-check.routes";

const API_VERSION = ENV.API_VERSION;

const router = express.Router();

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
