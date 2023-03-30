import { Router } from "express";
import { authenticate } from "../middlewares/authentication";
import commentRouter from "./comment";
import postRouter from "./post";
import userRouter from "./user";

const router = Router();

router.use("/users", userRouter);
router.use(authenticate);
router.use("/posts", postRouter);
router.use("/comments", commentRouter);

export default router;
