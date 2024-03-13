import { Book } from "@prisma/client";
import supertest from "supertest";
import { server } from "../config/http";

const API_VERSION = process.env.API_VERSION || 1;
const BASE_URL = `/api/v${API_VERSION}`;

let newBookCreated: Book = {} as Book;

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

    it("[POST] / => should return new book with id", async () => {
      const newBook = {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        publicationYear: 1960,
        description:
          "A classic novel that explores themes of racial injustice and moral growth in the American South.",
        isbn: "978-0-06-112008-4",
        genres: ["Fiction", "Classics"],
      };

      const response = await request.post(BOOKS_URL).send(newBook);

      expect(response.status).toBe(200);

      expect(response.body).toEqual({
        success: true,
        message: "Book created successfully",
        data: {
          ...newBook,
          id: expect.any(String),
        },
      });

      newBookCreated = response.body.data;
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
