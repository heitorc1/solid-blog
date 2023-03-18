import { Comments } from "@prisma/client";
import { inject, injectable } from "inversify";
import { TYPES } from "../config/types";
import InvalidCommentError from "../errors/InvalidCommentError";
import { UpdateComment } from "../interfaces/comment";
import CommentRepository from "../repositories/comments";

@injectable()
class CommentService {
  private _repository: CommentRepository;

  constructor(@inject(TYPES.CommentRepository) repository: CommentRepository) {
    this._repository = repository;
  }

  async update(id: number, params: UpdateComment): Promise<Comments> {
    await this.getById(id);
    return this._repository.update(id, params);
  }

  async delete(id: number): Promise<Comments> {
    await this.getById(id);
    return this._repository.delete(id);
  }

  async getById(id: number): Promise<Comments> {
    const comment = await this._repository.getCommentById(id);
    if (!comment) {
      throw new InvalidCommentError("Comment not found", 404);
    }
    return comment;
  }
}

export default CommentService;
