import { injectable } from "inversify";
import prisma from "../config/database";
import {
  IComment,
  ICommentRepository,
  ICreateComment,
  IUpdateComment,
} from "../interfaces/comment";

@injectable()
class CommentRepository implements ICommentRepository {
  private _selectFields = {
    text: true,
    createdAt: true,
    user: {
      select: {
        name: true,
      },
    },
  };

  async create(postId: number, params: ICreateComment): Promise<IComment> {
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
      select: this._selectFields,
    });
  }

  async update(id: number, params: IUpdateComment): Promise<IComment> {
    return prisma.comments.update({
      data: { text: params.text },
      where: {
        id: id,
      },
      select: this._selectFields,
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.comments.delete({ where: { id } });
    return;
  }

  async getCommentById(id: number): Promise<IComment | null> {
    return prisma.comments.findFirst({
      where: { id },
      select: this._selectFields,
    });
  }
}

export default CommentRepository;
