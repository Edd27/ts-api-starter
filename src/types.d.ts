import { Response } from "express";

export type ErrorDictionary = {
  [key: string]: (res: Response, err?: Error) => Response;
};

export type APIResponse = {
  success: boolean;
  message: string;
  data: unknown;
};
