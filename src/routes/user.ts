import { Router } from "express";
import UserController from "../controllers/user";
import { TYPES } from "../config/types";
import container from "../config/container";

const userRouter = Router();

const controller = container.get<UserController>(TYPES.UserController);

userRouter.post("/create", controller.index.bind(controller));
userRouter.post("/login", controller.login.bind(controller));

export default userRouter;
