import { injectable } from "inversify";
import {
  ICategory,
  ICategoryRepository,
  ICreateCategory,
} from "../interfaces/category";
import prisma from "../config/database";

@injectable()
class CategoryRepository implements ICategoryRepository {
  async create(params: ICreateCategory): Promise<ICategory> {
    return prisma.categories.create({
      data: {
        name: params.name,
        post: {
          connect: {
            id: params.postId,
          },
        },
      },
    });
  }
}

export default CategoryRepository;
