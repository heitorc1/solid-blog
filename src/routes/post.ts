import { Router } from "express";
import container from "../config/container";
import { TYPES } from "../config/types";
import PostController from "../controllers/post";

const postRouter = Router();
const controller = container.get<PostController>(TYPES.PostController);

postRouter.get("/", controller.index.bind(controller));
postRouter.post("/", controller.create.bind(controller));
postRouter.put("/:id", controller.update.bind(controller));
postRouter.delete("/:id", controller.delete.bind(controller));
postRouter.get("/:id", controller.getPostById.bind(controller));
postRouter.post("/:id/comments", controller.createComment.bind(controller));

export default postRouter;
