import { injectable } from "inversify";
import PostService from "../services/post";
import { inject } from "inversify";
import { TYPES } from "../config/types";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { IPostController } from "../interfaces/post";

@injectable()
class PostController implements IPostController {
  private _service: PostService;

  constructor(@inject(TYPES.PostService) service: PostService) {
    this._service = service;
  }

  async index(req: Request, res: Response, next: NextFunction) {
    const params = req.query;

    try {
      const validatedData = z
        .object({
          page: z.coerce.number().optional(),
          perPage: z.coerce.number().optional(),
        })
        .parse(params);

      const posts = await this._service.index(
        validatedData.page ? validatedData.page : undefined,
        validatedData.perPage ? validatedData.perPage : undefined
      );
      res.json(posts);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    try {
      z.object({
        title: z.string(),
        content: z.string(),
        published: z.boolean(),
        userId: z.number(),
      }).parse(body);

      const post = await this._service.create(body);

      res.json(post);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const body = req.body;

    try {
      z.object({
        title: z.string().optional(),
        content: z.string().optional(),
        published: z.boolean().optional(),
      }).parse(body);

      const post = await this._service.update(parseInt(id), body);
      res.json(post);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      await this._service.delete(parseInt(id));
      res.json({ message: "Post deleted successfully!" });
    } catch (error) {
      next(error);
    }
  }

  async getPostById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const post = await this._service.getPostById(parseInt(id));
      res.json(post);
    } catch (error) {
      next(error);
    }
  }

  async createComment(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const body = req.body;

    try {
      const validatedData = z
        .object({
          text: z.string(),
          userId: z.number(),
        })
        .parse(body);

      const comment = await this._service.createComment(
        parseInt(id),
        validatedData
      );
      res.json(comment);
    } catch (error) {
      next(error);
    }
  }
}

export default PostController;
