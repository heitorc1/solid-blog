import { Comments } from "@prisma/client";
import { injectable } from "inversify";
import prisma from "../config/database";
import { CreateComment, UpdateComment } from "../interfaces/comment";

@injectable()
class CommentRepository {
  async create(postId: number, params: CreateComment): Promise<Comments> {
    return prisma.comments.create({
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
    return prisma.comments.update({
      data: { text: params.text },
      where: {
        id: id,
      },
    });
  }

  async delete(id: number): Promise<Comments> {
    return prisma.comments.delete({
      where: { id },
    });
  }

  async getCommentById(id: number): Promise<Comments | null> {
    return prisma.comments.findFirst({ where: { id } });
  }
}

export default CommentRepository;
