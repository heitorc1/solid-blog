import { NextFunction, Request, Response } from "express";
import { inject } from "inversify";
import { z } from "zod";
import { TYPES } from "../config/types";
import { ICommentController } from "../interfaces/comment";
import CommentService from "../services/comment";
import { controller, httpDelete, httpPut } from "inversify-express-utils";

@controller("/comments", TYPES.AuthenticationMiddleware)
class CommentController implements ICommentController {
  private _service: CommentService;

  constructor(@inject(TYPES.CommentService) service: CommentService) {
    this._service = service;
  }

  @httpPut("/:id")
  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const body = req.body;

    try {
      const validatedId = z.coerce.number().parse(id);
      const validatedBody = z
        .object({ text: z.string().min(3).max(400) })
        .parse(body);

      const response = await this._service.update(validatedId, validatedBody);
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  }

  @httpDelete("/:id")
  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const validatedId = z.coerce.number().parse(id);
      const response = await this._service.delete(validatedId);
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default CommentController;
