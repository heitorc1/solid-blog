import { Router } from "express";
import container from "../config/container";
import { TYPES } from "../config/types";
import CommentController from "../controllers/comment";

const commentRouter = Router();

const controller = container.get<CommentController>(TYPES.CommentController);

commentRouter.put("/:id", controller.update.bind(controller));
commentRouter.delete("/:id", controller.delete.bind(controller));

export default commentRouter;
