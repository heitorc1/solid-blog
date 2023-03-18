import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { z } from "zod";
import { TYPES } from "../config/types";
import { UserControllerInterface } from "../interfaces/user";
import UserService from "../services/user";

@injectable()
class UserController {
  private _service: UserService;

  constructor(@inject(TYPES.UserService) service: UserService) {
    this._service = service;
  }

  async index(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    try {
      const userData = z
        .object({
          name: z.string(),
          email: z.string().email(),
          password: z.string().min(8).max(64),
        })
        .parse(body);

      const user = await this._service.create(userData);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    try {
      const userData = z
        .object({
          email: z.string(),
          password: z.string(),
        })
        .parse(body);

      const token = await this._service.login(userData);

      return res.json({ success: "User logged in", token });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
