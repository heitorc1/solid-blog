import { Comments } from "@prisma/client";
import InvalidCommentError from "../errors/InvalidCommentError";
import { UpdateComment } from "../interfaces/comment";
import commentRepository from "../repositories/comments";

class CommentService {
  async update(id: number, params: UpdateComment): Promise<Comments> {
    await this.getById(id);
    return commentRepository.update(id, params);
  }

  async delete(id: number): Promise<Comments> {
    await this.getById(id);
    return commentRepository.delete(id);
  }

  async getById(id: number): Promise<Comments> {
    const comment = await commentRepository.getCommentById(id);
    if (!comment) {
      throw new InvalidCommentError("Comment not found", 404);
    }
    return comment;
  }
}

const commentService = new CommentService();
export default commentService;
