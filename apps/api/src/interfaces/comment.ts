import { Controller } from "./controller";
import { IResponse } from "./response";

export interface IComment {
  text: string;
  createdAt: Date;
  user: {
    name: string;
  };
}

export interface ICreateComment {
  text: string;
  userId: number;
}

export interface IUpdateComment {
  text: string;
}

export interface ICommentController {
  update: Controller<void>;
  delete: Controller<void>;
}

export interface ICommentService {
  update: (id: number, params: IUpdateComment) => Promise<IResponse<IComment>>;
  delete: (id: number) => Promise<IResponse<void>>;
}

export interface ICommentRepository {
  create: (postId: number, params: ICreateComment) => Promise<IComment>;
  update: (id: number, params: IUpdateComment) => Promise<IComment>;
  delete: (id: number) => Promise<void>;
  getCommentById: (id: number) => Promise<IComment | null>;
}
