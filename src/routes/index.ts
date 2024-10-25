import express from "express";
import { bookRouter } from "./books.routes";
import { healthCheckRouter } from "./healtk-check.routes";

const API_VERSION = process.env.API_VERSION ?? 1;

const router = express.Router();

router.get("/api/v1", (_req, res) => {
  res.json({
    success: true,
    message: "It Works!",
    data: [],
  });
});

router.use(`/api/v${API_VERSION}/books`, bookRouter);
router.use(healthCheckRouter);

export default router;
