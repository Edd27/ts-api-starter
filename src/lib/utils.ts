import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { z, ZodError, ZodSchema } from "zod";
import { ServiceResponse } from "./service-response";

export const handleServiceResponse = (
  serviceResponse: ServiceResponse<any>,
  response: Response,
) => {
  return response.status(serviceResponse.statusCode).send(serviceResponse);
};

export const validateRequest =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({ ...req.body, ...req.query, params: req.params });
      next();
    } catch (err) {
      const errorMessage = `Invalid input: ${(err as ZodError).errors.map((e) => `${e.path.map((path) => path).join(".")}: ${e.message}`).join(", ")}`;
      const statusCode = StatusCodes.BAD_REQUEST;
      const serviceResponse = ServiceResponse.failure(
        errorMessage,
        null,
        statusCode,
      );
      handleServiceResponse(serviceResponse, res);
    }
  };

export const commonValidations = {
  id: z.string().cuid(),
};
