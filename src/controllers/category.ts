import { inject } from "inversify";
import { ICategoryController } from "../interfaces/category";
import CategoryService from "../services/category";
import { TYPES } from "../config/types";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { controller, httpPost } from "inversify-express-utils";

@controller("/categories", TYPES.AuthenticationMiddleware)
class CategoryController implements ICategoryController {
  private _service: CategoryService;

  constructor(@inject(TYPES.CategoryService) service: CategoryService) {
    this._service = service;
  }

  @httpPost("/")
  async create(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    try {
      const validatedBody = z
        .object({
          name: z.string().min(3).max(255),
          postId: z.number(),
        })
        .parse(body);

      const response = await this._service.create(validatedBody);
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default CategoryController;
