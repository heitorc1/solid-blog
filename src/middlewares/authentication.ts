import { NextFunction, Request, Response } from "express";
import { verify, TokenExpiredError } from "jsonwebtoken";
import { JWT_SECRET } from "../envs";
import AuthenticationError from "../errors/AuthenticationError";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.headers;

  if (!token || Array.isArray(token)) {
    throw new AuthenticationError("Token not found", 404);
  }

  try {
    verify(token, JWT_SECRET);
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new AuthenticationError("Expired token", 404);
    }
    throw new AuthenticationError("Invalid token", 404);
  }
};
