import { Comments, PrismaClient } from "@prisma/client";
import { CreateComment, UpdateComment } from "../interfaces/comment";

class CommentRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(postId: number, params: CreateComment): Promise<Comments> {
    return this.prisma.comments.create({
      data: {
        text: params.text,
        user: {
          connect: {
            id: params.userId,
          },
        },
        post: {
          connect: {
            id: postId,
          },
        },
      },
    });
  }

  async update(id: number, params: UpdateComment): Promise<Comments> {
    return this.prisma.comments.update({
      data: { text: params.text },
      where: {
        id: id,
      },
    });
  }

  async delete(id: number): Promise<Comments> {
    return this.prisma.comments.delete({
      where: { id },
    });
  }

  async getCommentById(id: number): Promise<Comments | null> {
    return this.prisma.comments.findFirst({ where: { id } });
  }
}

const commentRepository = new CommentRepository();
export default commentRepository;
