import { Router } from "express";
import booksRoutes from "./books.routes";

const API_VERSION = process.env.API_VERSION ?? 1;

const router = Router();

router.get("/api/v1", (req, res) => {
  return res
    .status(200)
    .json({
      success: true,
      message: "It Works!",
      data: [],
    })
    .end();
});
router.use(`/api/v${API_VERSION}/books`, booksRoutes);

export default router;
