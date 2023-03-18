import { inject, injectable } from "inversify";
import { TYPES } from "../config/types";
import InvalidCommentError from "../errors/InvalidCommentError";
import {
  IComment,
  ICommentService,
  IUpdateComment,
} from "../interfaces/comment";
import CommentRepository from "../repositories/comments";

@injectable()
class CommentService implements ICommentService {
  private _repository: CommentRepository;

  constructor(@inject(TYPES.CommentRepository) repository: CommentRepository) {
    this._repository = repository;
  }

  async update(id: number, params: IUpdateComment): Promise<IComment> {
    await this.getById(id);
    return this._repository.update(id, params);
  }

  async delete(id: number): Promise<void> {
    await this.getById(id);
    await this._repository.delete(id);
    return;
  }

  async getById(id: number): Promise<IComment> {
    const comment = await this._repository.getCommentById(id);
    if (!comment) {
      throw new InvalidCommentError("Comment not found", 404);
    }
    return comment;
  }
}

export default CommentService;
