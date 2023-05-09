import PostService from "../services/post";
import { inject } from "inversify";
import { TYPES } from "../config/types";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { IPostController } from "../interfaces/post";
import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
} from "inversify-express-utils";

@controller("/posts", TYPES.AuthenticationMiddleware)
class PostController implements IPostController {
  private _service: PostService;

  constructor(@inject(TYPES.PostService) service: PostService) {
    this._service = service;
  }

  @httpGet("/")
  async index(req: Request, res: Response, next: NextFunction) {
    const params = req.query;

    try {
      const validatedData = z
        .object({
          page: z.coerce.number().optional(),
          perPage: z.coerce.number().optional(),
        })
        .parse(params);

      const response = await this._service.index(
        validatedData.page ? validatedData.page : undefined,
        validatedData.perPage ? validatedData.perPage : undefined
      );
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  }

  @httpPost("/")
  async create(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    try {
      z.object({
        title: z.string(),
        content: z.string(),
        published: z.boolean(),
        userId: z.number(),
      }).parse(body);

      const response = await this._service.create(body);

      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  }

  @httpPut("/:id")
  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const body = req.body;

    try {
      const validatedId = z.coerce.number().parse(id);
      z.object({
        title: z.string().optional(),
        content: z.string().optional(),
        published: z.boolean().optional(),
      }).parse(body);

      const response = await this._service.update(validatedId, body);
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

  @httpGet("/:id")
  async getPost(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const validatedId = z.coerce.number().parse(id);
      const response = await this._service.getPost(validatedId);
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  }

  @httpPost("/:id/comments")
  async createComment(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const body = req.body;

    try {
      const validatedId = z.coerce.number().parse(id);
      const validatedData = z
        .object({
          text: z.string(),
          userId: z.number(),
        })
        .parse(body);

      const response = await this._service.createComment(
        validatedId,
        validatedData
      );
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default PostController;
