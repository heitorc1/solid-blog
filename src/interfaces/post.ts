import { IComment } from "./comment";
import { Controller } from "./controller";
import { IPagination } from "./pagination";

export interface IPost {
  title: string;
  content: string;
  published: boolean;
  user: {
    name: string;
    email: string;
  };
  comments?: IComment[];
}

export interface ICreatePost {
  title: string;
  content: string;
  published: boolean;
  userId: number;
}

export interface IListPost {
  data: IPost[];
  pagination: IPagination;
}

export interface IPostController {
  index: Controller<void>;
  create: Controller<void>;
  update: Controller<void>;
  delete: Controller<void>;
  getPostById: Controller<void>;
  createComment: Controller<void>;
}

export interface IPostService {
  index: (page: number, perPage: number) => Promise<IListPost>;
  create: (params: ICreatePost) => Promise<IPost>;
  update: (id: number, params: ICreatePost) => Promise<IPost>;
  delete: (id: number) => Promise<void>;
  getPostById: (id: number) => Promise<IPost>;
}

export interface IPostRepository {
  index: (page: number, perPage: number) => Promise<IListPost>;
  create: (post: ICreatePost) => Promise<IPost>;
  update: (id: number, post: Partial<ICreatePost>) => Promise<IPost>;
  delete: (id: number) => Promise<void>;
  findPostById: (id: number) => Promise<IPost | null>;
}
