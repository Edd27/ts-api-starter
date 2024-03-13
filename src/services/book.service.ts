import { Book } from "@prisma/client";
import { Omit } from "@prisma/client/runtime/library";
import prisma from "../config/db";

export class BookService {
  static async getAll() {
    const result = await prisma.book.findMany();
    return result;
  }

  static async getById(id: string) {
    const result = await prisma.book.findUnique({
      where: { id },
    });

    return result;
  }

  static async create(data: Omit<Book, "id">) {
    const result = await prisma.book.create({
      data,
    });

    return result;
  }
}
