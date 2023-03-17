import { PrismaClient } from "@prisma/client";
import { CreateComment, IComment } from "../interfaces/comment";

class CommentRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(postId: number, params: CreateComment) {
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
}

const commentRepository = new CommentRepository();
export default commentRepository;
