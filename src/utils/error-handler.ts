import { NextFunction, Request, Response } from "express";
import { ErrorDictionary } from "../types";

const ERROR_HANDLER: ErrorDictionary = {
  PrismaClientValidationError: (res: Response) => {
    return res
      .status(400)
      .json({
        message: "One or more arguments are missing",
      })
      .end();
  },
  DefaultError: (res: Response) => {
    return res
      .status(500)
      .json({
        message:
          "Internal server error, please contact to system administrator",
      })
      .end();
  },
};

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error("HANDLING ERROR => ", { err });

  const handler = ERROR_HANDLER[err.name] || ERROR_HANDLER.DefaultError;

  return handler(res, err);
};
