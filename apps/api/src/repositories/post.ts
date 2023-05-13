import prisma from "../config/database";
import {
  ICreatePost,
  IListPost,
  IPost,
  IPostRepository,
} from "../interfaces/post";
import { injectable } from "inversify";

@injectable()
class PostRepository implements IPostRepository {
  private _selectFields = {
    title: true,
    content: true,
    published: true,
    user: {
      select: {
        name: true,
        email: true,
      },
    },
  };

  async index(page: number, perPage: number): Promise<IListPost> {
    const totalPosts = await prisma.post.count();
    const posts = await prisma.post.findMany({
      skip: (page - 1) * perPage,
      take: perPage,
      select: {
        title: true,
        content: true,
        published: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return {
      data: posts,
      pagination: {
        page: page,
        perPage: perPage,
        total: totalPosts,
      },
    };
  }

  async create(post: ICreatePost): Promise<IPost> {
    return prisma.post.create({
      data: {
        title: post.title,
        content: post.content,
        published: post.published,
        user: {
          connect: {
            id: post.userId,
          },
        },
      },
      select: this._selectFields,
    });
  }

  async update(id: number, post: Partial<ICreatePost>): Promise<IPost> {
    return prisma.post.update({
      data: {
        title: post.title,
        content: post.content,
        published: post.published,
      },
      where: { id },
      select: this._selectFields,
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.post.delete({
      where: { id },
    });
    return;
  }

  async findPostById(id: number): Promise<IPost | null> {
    return prisma.post.findFirst({
      where: { id },
      select: {
        title: true,
        content: true,
        published: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        comments: {
          select: {
            user: {
              select: {
                name: true,
              },
            },
            text: true,
            createdAt: true,
          },
        },
      },
    });
  }
}

export default PostRepository;
