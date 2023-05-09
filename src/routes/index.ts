import { Router } from "express";
import { authenticate } from "../middlewares/authentication";
import commentRouter from "./comment";
import postRouter from "./post";
import userRouter from "./user";
import categoryRouter from "./category";

const router = Router();

router.use("/users", userRouter);
router.use(authenticate);
router.use("/posts", postRouter);
router.use("/comments", commentRouter);
router.use("/categories", categoryRouter);

export default router;
