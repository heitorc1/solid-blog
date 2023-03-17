import { NextFunction, Request, Response, Router } from "express";
import { z } from "zod";
import userService from "../services/user";

const userRouter = Router();

userRouter.post(
  "/create",
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    try {
      const userData = z
        .object({
          name: z.string(),
          email: z.string().email(),
          password: z.string().min(8).max(64),
        })
        .parse(body);

      const user = await userService.create(userData);

      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    try {
      const userData = z
        .object({
          email: z.string(),
          password: z.string(),
        })
        .parse(body);

      const token = await userService.login(userData);

      return res.json({ success: "User logged in", token });
    } catch (error) {
      next(error);
    }
  }
);

export default userRouter;
