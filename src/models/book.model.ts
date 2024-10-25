import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { commonValidations } from "../lib/utils";

extendZodWithOpenApi(z);

export type Book = Prisma.BookGetPayload<{}>;

export const BookSchema = z.object({
  id: z.string(),
  description: z.string().optional(),
  title: z.string(),
  author: z.string(),
  publicationYear: z.number(),
  isbn: z.string(),
  genres: z.array(z.string()),
});

export const GetBookSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});
