import prisma from "../lib/prisma";
import { Book } from "../models/book.model";

export class BookRepository {
  async findAllAsync(): Promise<Book[]> {
    const book = await prisma.book.findMany();
    return book;
  }

  async findByIdAsync(id: string): Promise<Book | null> {
    const book = await prisma.book.findUnique({
      where: { id },
    });
    return book;
  }
}
