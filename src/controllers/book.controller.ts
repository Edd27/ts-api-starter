import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { BookService } from "../services/book.service";

export async function getAllBooks(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const books = await BookService.getAll();

    return res
      .status(200)
      .json({
        success: true,
        message: null,
        data: books,
      })
      .end();
  } catch (e) {
    next(e);
  }
}

export async function getBookById(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Fields are missing or types are incorrect",
          data: errors.mapped(),
        })
        .end();
    }

    const book = await BookService.getById(req.params["id"]);

    if (!book) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Book not found",
          data: null,
        })
        .end();
    }

    return res
      .status(200)
      .json({
        success: true,
        message: null,
        data: book,
      })
      .end();
  } catch (e) {
    return next(e);
  }
}

export async function createBook(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Fields are missing or types are incorrect",
          data: errors.mapped(),
        })
        .end();
    }

    const bookCreated = await BookService.create(req.body);

    return res
      .status(200)
      .json({
        success: true,
        message: "Book created successfully",
        data: bookCreated,
      })
      .end();
  } catch (e) {
    return next(e);
  }
}
