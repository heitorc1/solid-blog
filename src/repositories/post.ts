import { Post } from "@prisma/client";
import prisma from "../config/database";
import { CreatePost, IPost, ListPost } from "../interfaces/post";
import { injectable } from "inversify";

@injectable()
class PostRepository {
  async index(page: number, perPage: number): Promise<ListPost> {
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

  async create(post: CreatePost): Promise<Post> {
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
    });
  }

  async update(id: number, post: Partial<CreatePost>): Promise<Post> {
    return prisma.post.update({
      data: {
        title: post.title,
        content: post.content,
        published: post.published,
      },
      where: { id },
    });
  }

  async delete(id: number): Promise<Post> {
    return prisma.post.delete({
      where: { id },
    });
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
