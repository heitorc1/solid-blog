import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { z } from "zod";
import { TYPES } from "../config/types";
import { ICommentController } from "../interfaces/comment";
import CommentService from "../services/comment";

@injectable()
class CommentController implements ICommentController {
  private _service: CommentService;

  constructor(@inject(TYPES.CommentService) service: CommentService) {
    this._service = service;
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const body = req.body;

    try {
      const validatedData = z.object({ text: z.string() }).parse(body);

      const comment = await this._service.update(parseInt(id), validatedData);
      res.json(comment);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      await this._service.delete(parseInt(id));
      res.json({ message: "Comment deleted successfully!" });
    } catch (error) {
      next(error);
    }
  }
}

export default CommentController;
