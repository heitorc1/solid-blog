import { inject, injectable } from "inversify";
import {
  ICategory,
  ICategoryService,
  ICreateCategory,
} from "../interfaces/category";
import CategoryRepository from "../repositories/category";
import { TYPES } from "../config/types";
import { IResponse } from "../interfaces/response";

@injectable()
class CategoryService implements ICategoryService {
  private _repository: CategoryRepository;

  constructor(
    @inject(TYPES.CategoryRepository) repository: CategoryRepository
  ) {
    this._repository = repository;
  }

  async create(params: ICreateCategory): Promise<IResponse<ICategory>> {
    const category = await this._repository.create(params);
    return {
      message: "Category created successfully!",
      status: 200,
      data: category,
    };
  }
}

export default CategoryService;
