import { Post, PrismaClient } from "@prisma/client";
import { CreatePost, IPost, ListPost } from "../interfaces/post";

class PostRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async index(page: number, perPage: number): Promise<ListPost> {
    const totalPosts = await this.prisma.post.count();
    const posts = await this.prisma.post.findMany({
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
    return this.prisma.post.create({
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
    return this.prisma.post.update({
      data: {
        title: post.title,
        content: post.content,
        published: post.published,
      },
      where: { id },
    });
  }

  async delete(id: number): Promise<Post> {
    return this.prisma.post.delete({
      where: { id },
    });
  }

  async findPostById(id: number): Promise<IPost | null> {
    return this.prisma.post.findFirst({
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

const postRepository = new PostRepository();
export default postRepository;
