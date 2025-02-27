import { Book } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { logger } from "../lib/pino";
import { ServiceResponse } from "../lib/service-response";
import { BookRepository } from "../repositories/book.repository";

export class BookService {
  private bookRepository: BookRepository;

  constructor(repository: BookRepository = new BookRepository()) {
    this.bookRepository = repository;
  }

  async findAll(): Promise<ServiceResponse<Book[] | null>> {
    try {
      const books = await this.bookRepository.findAllAsync();
      if (!books || books.length === 0) {
        return ServiceResponse.failure(
          "No books found",
          null,
          StatusCodes.NOT_FOUND,
        );
      }
      return ServiceResponse.success<Book[]>("Books found", books);
    } catch (e) {
      const errorMessage = `Error finding all books: $${(e as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving books.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findById(id: string): Promise<ServiceResponse<Book | null>> {
    try {
      const book = await this.bookRepository.findByIdAsync(id);
      if (!book) {
        return ServiceResponse.failure(
          "Book not found",
          null,
          StatusCodes.NOT_FOUND,
        );
      }
      return ServiceResponse.success<Book>("Book found", book);
    } catch (e) {
      const errorMessage = `Error finding book with id ${id}:, ${(e as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while finding book.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createAsync(book: Book): Promise<ServiceResponse<Book | null>> {
    try {
      const newBook = await this.bookRepository.createAsync(book);
      if (!newBook) {
        return ServiceResponse.failure(
          "Book not created",
          null,
          StatusCodes.BAD_REQUEST,
        );
      }
      return ServiceResponse.success<Book>("Book created", book);
    } catch (e) {
      const errorMessage = `Error creating book, ${(e as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while creating book.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

export const bookService = new BookService();
