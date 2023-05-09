import { Controller } from "./controller";
import { IResponse } from "./response";

export interface ICategory {
  name: string;
}

export interface ICreateCategory {
  name: string;
  postId: number;
}

export interface ICategoryController {
  create: Controller<void>;
}

export interface ICategoryService {
  create: (params: ICreateCategory) => Promise<IResponse<ICategory>>;
}

export interface ICategoryRepository {
  create: (params: ICreateCategory) => Promise<ICategory>;
}
