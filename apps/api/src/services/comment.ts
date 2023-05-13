import { inject, injectable } from "inversify";
import { TYPES } from "../config/types";
import InvalidCommentError from "../errors/InvalidCommentError";
import {
  IComment,
  ICommentService,
  IUpdateComment,
} from "../interfaces/comment";
import { IResponse } from "../interfaces/response";
import CommentRepository from "../repositories/comments";

@injectable()
class CommentService implements ICommentService {
  private _repository: CommentRepository;

  constructor(@inject(TYPES.CommentRepository) repository: CommentRepository) {
    this._repository = repository;
  }

  async update(
    id: number,
    params: IUpdateComment
  ): Promise<IResponse<IComment>> {
    await this._getById(id);
    const comment = await this._repository.update(id, params);
    return {
      message: "Post updated successfully!",
      status: 200,
      data: comment,
    };
  }

  async delete(id: number): Promise<IResponse<void>> {
    await this._getById(id);
    await this._repository.delete(id);
    return {
      message: "Post deleted successfully!",
      status: 200,
    };
  }

  private async _getById(id: number): Promise<IComment> {
    const comment = await this._repository.getCommentById(id);
    if (!comment) {
      throw new InvalidCommentError("Comment not found", 404);
    }
    return comment;
  }
}

export default CommentService;
