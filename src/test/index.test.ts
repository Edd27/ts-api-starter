import { Book } from "@prisma/client";
import supertest from "supertest";
import { server } from "../config/http";

const API_VERSION = process.env.API_VERSION || 1;
const BASE_URL = `/api/v${API_VERSION}`;

const newBookCreated: Book = {} as Book;

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

    it("[GET] / => should return a list of books", async () => {
      const response = await request.get(BOOKS_URL);

      expect(response.status).toBe(200);

      expect(response.body).toEqual({
        success: true,
        message: null,
        data: expect.any(Array<Book>),
      });
    });

    it("[GET] /:id => Book not found: should return status 404 and message 'Book not found'", async () => {
      const response = await request.get(`${BOOKS_URL}/1000`);

      expect(response.status).toBe(404);

      expect(response.body).toEqual({
        success: false,
        message: "Book not found",
        data: null,
      });
    });

    it("[GET] /:id => should return status 200 and a book as data", async () => {
      const responseGetById = await request.get(
        `${BOOKS_URL}/${newBookCreated.id}`,
      );

      expect(responseGetById.status).toBe(200);

      expect(responseGetById.body).toEqual({
        success: true,
        message: null,
        data: expect.any(Object),
      });
    });
  });
});
