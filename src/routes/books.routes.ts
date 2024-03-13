import { Router } from "express";
import {
  createBook,
  getAllBooks,
  getBookById,
} from "../controllers/book.controller";
import {
  getBookByIdValidations,
  registerBookValidations,
} from "../dto/book.dto";

const router = Router();

router.get("/", getAllBooks);
router.get("/:id", getBookByIdValidations, getBookById);
router.post("/", registerBookValidations, createBook);

export default router;
