import { Request, Response } from "express";
import { handleServiceResponse } from "../lib/utils";
import { bookService } from "../services/book.service";

export class BookController {
  public static async getBooks(_req: Request, res: Response) {
    const serviceResponse = await bookService.findAll();
    handleServiceResponse(serviceResponse, res);
  }

  public static async getBook(req: Request, res: Response) {
    const id = req.params.id;
    const serviceResponse = await bookService.findById(id);
    handleServiceResponse(serviceResponse, res);
  }

  public static async createBook(req: Request, res: Response) {
    const book = req.body;
    const serviceResponse = await bookService.createAsync(book);
    handleServiceResponse(serviceResponse, res);
  }
}
