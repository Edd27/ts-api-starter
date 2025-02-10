import { Book } from "@prisma/client";
import supertest from "supertest";
import { ENV } from "../config/env";
import { server } from "../config/http";

const API_VERSION = ENV.API_VERSION;
const BASE_URL = `/api/v${API_VERSION}`;

describe(BASE_URL, () => {
  describe("/", () => {
    const request = supertest.agent(server);

    afterAll(() => {
      server.close();
    });

    it("should return status 200", async () => {
      const response = await request.get(BASE_URL);

      expect(response.status).toBe(200);

      expect(response.body).toEqual({
        success: true,
        message: "It Works!",
        data: [],
      });
    });
  });

  describe("/books", () => {
    const request = supertest.agent(server);

    afterAll(() => {
      server.close();
    });

    const BOOKS_URL = `${BASE_URL}/books`;

    const books: Book[] = [];

    it("[GET] / => should return a list of books", async () => {
      const response = await request.get(BOOKS_URL);

      if (!response.body.data) {
        expect(response.status).toBe(404);

        expect(response.body).toEqual({
          success: false,
          message: "No books found",
          data: null,
          statusCode: 404,
        });

        return;
      }

      expect(response.status).toBe(200);

      expect(response.body).toEqual({
        success: true,
        message: "Books found",
        data: expect.any(Array<Book>),
        statusCode: 200,
      });

      books.push(...response.body.data);
    });

    it("[GET] /:id => Book not found: should return status 404 and message 'Book not found'", async () => {
      const response = await request.get(
        `${BOOKS_URL}/cm6zfryzl0000n7g7cfkum4sl`,
      );

      expect(response.status).toBe(404);

      expect(response.body).toEqual({
        success: false,
        message: "Book not found",
        data: null,
        statusCode: 404,
      });
    });

    it("[GET] /:id => should return status 200 and a book as data", async () => {
      const responseGetById = await request.get(`${BOOKS_URL}/${books[0].id}`);

      expect(responseGetById.status).toBe(200);

      expect(responseGetById.body).toEqual({
        success: true,
        message: "Book found",
        data: expect.any(Object),
        statusCode: 200,
      });
    });
  });
});
