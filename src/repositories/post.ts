import { Post, PrismaClient } from "@prisma/client";
import { IPost } from "../interfaces/post";

class PostRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async index(): Promise<Post[]> {
    return this.prisma.post.findMany({});
  }

  async create(post: IPost): Promise<Post> {
    return this.prisma.post.create({
      data: {
        title: post.title,
        content: post.content,
        published: post.published,
      },
    });
  }

  async update(id: number, post: Partial<IPost>): Promise<Post> {
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
