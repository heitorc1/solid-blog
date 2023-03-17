import { Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import userRepository from "../repositories/user";
import { z } from "zod";

const userRouter = Router();

userRouter.post("/create", async (req: Request, res: Response) => {
  const body = req.body;

  try {
    const user = z
      .object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(8).max(64),
      })
      .parse(body);

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = await userRepository.create({
      ...user,
      password: hashedPassword,
    });

    res.json(newUser);
  } catch (error) {
    res.json(error);
  }
});

userRouter.post("/login", async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const userData = z
      .object({
        email: z.string(),
        password: z.string(),
      })
      .parse(body);

    const user = await userRepository.getPassword(userData.email);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isSamePassword = await bcrypt.compare(
      userData.password,
      user.password
    );

    if (!isSamePassword) {
      return res.status(404).json({ error: "Password incorrect" });
    }
    return res.json({ success: "User logged in" });
  } catch (error) {
    return res.json(error);
  }
});

export default userRouter;
