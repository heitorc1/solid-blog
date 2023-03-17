import { Post, PrismaClient } from "@prisma/client";
import { CreatePost, ListPost } from "../interfaces/post";

class PostRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async index(): Promise<ListPost[]> {
    return this.prisma.post.findMany({
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
}

const postRepository = new PostRepository();
export default postRepository;
