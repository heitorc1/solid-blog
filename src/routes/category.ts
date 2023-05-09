import { Router } from "express";
import container from "../config/container";
import CategoryController from "../controllers/category";
import { TYPES } from "../config/types";

const categoryRouter = Router();

const controller = container.get<CategoryController>(TYPES.CategoryController);

categoryRouter.post("/", controller.create.bind(controller));

export default categoryRouter;
