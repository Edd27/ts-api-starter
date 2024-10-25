import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";
import { createApiResponse } from "../config/open-api-res-builders";
import { BookController } from "../controllers/book.controller";
import { validateRequest } from "../lib/utils";
import { BookSchema, GetBookSchema } from "../models/book.model";

export const bookRegistry = new OpenAPIRegistry();

export const bookRouter: Router = express.Router();

bookRegistry.register("Book", BookSchema);

bookRegistry.registerPath({
  method: "get",
  path: "/books",
  tags: ["Book"],
  responses: createApiResponse(z.array(BookSchema), "Success"),
});

bookRouter.get("/", BookController.getBooks);

bookRegistry.registerPath({
  method: "get",
  path: "/books/{id}",
  tags: ["Book"],
  request: { params: GetBookSchema.shape.params },
  responses: createApiResponse(BookSchema, "Success"),
});

bookRouter.get("/:id", validateRequest(GetBookSchema), BookController.getBook);
