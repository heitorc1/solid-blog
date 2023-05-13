/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { CustomError } from "../abstracts/error";

export function errorHandler(
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (error instanceof ZodError) {
    return res.status(422).json(error);
  }

  if (error instanceof CustomError) {
    return res.status(error.status).json(error.toJSON());
  }
  console.error(error);
  res.status(500).json(error);
}
