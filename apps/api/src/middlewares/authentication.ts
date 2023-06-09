import { NextFunction, Request, Response } from "express";
import { TokenExpiredError, verify } from "jsonwebtoken";
import { JWT_SECRET } from "../config/envs";
import AuthenticationError from "../errors/AuthenticationError";
import { injectable } from "inversify";
import { IAuthentication } from "../interfaces/authentication";
import { BaseMiddleware } from "inversify-express-utils";

@injectable()
class AuthenticationMiddleware
  extends BaseMiddleware
  implements IAuthentication
{
  public handler(req: Request, res: Response, next: NextFunction) {
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
  }
}

export default AuthenticationMiddleware;
