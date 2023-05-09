import { NextFunction, Request, Response } from "express";

export interface IAuthentication {
  handler: (req: Request, res: Response, next: NextFunction) => void;
}
