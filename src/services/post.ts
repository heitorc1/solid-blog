import InvalidPostError from "../errors/InvalidPostError";
import {
  ICreatePost,
  IListPost,
  IPost,
  IPostService,
} from "../interfaces/post";
import { injectable, inject } from "inversify";
import { TYPES } from "../config/types";
import PostRepository from "../repositories/post";
import CommentRepository from "../repositories/comments";
import { IComment, ICreateComment } from "../interfaces/comment";
import { IResponse } from "../interfaces/response";

@injectable()
class PostService implements IPostService {
  private _repository: PostRepository;
  private _commentRepository: CommentRepository;

  constructor(
    @inject(TYPES.PostRepository) repository: PostRepository,
    @inject(TYPES.CommentRepository) commentRepository: CommentRepository
  ) {
    this._repository = repository;
    this._commentRepository = commentRepository;
  }

  async index(page = 1, perPage = 10): Promise<IResponse<IListPost>> {
    const posts = await this._repository.index(page, perPage);
    return {
      message: "Success!",
      status: 200,
      data: posts,
    };
  }

  async create(params: ICreatePost): Promise<IResponse<IPost>> {
    const post = await this._repository.create(params);
    return {
      message: "Post created successfully!",
      status: 201,
      data: post,
    };
  }

  async update(
    id: number,
    params: Partial<ICreatePost>
  ): Promise<IResponse<IPost>> {
    await this._checkIfPostExists(id);
    const post = await this._repository.update(id, params);
    return {
      message: "Post updated successfully!",
      status: 200,
      data: post,
    };
  }

  async delete(id: number): Promise<IResponse<void>> {
    await this._checkIfPostExists(id);
    await this._repository.delete(id);
    return {
      message: "Post deleted successfully!",
      status: 200,
    };
  }

  async getPost(id: number): Promise<IResponse<IPost>> {
    const post = await this._checkIfPostExists(id);
    return {
      message: "Success!",
      status: 200,
      data: post,
    };
  }

  async createComment(
    id: number,
    params: ICreateComment
  ): Promise<IResponse<IComment>> {
    await this._checkIfPostExists(id);
    const comment = await this._commentRepository.create(id, params);
    return {
      message: "Comment created successfully!",
      status: 201,
      data: comment,
    };
  }

  private async _checkIfPostExists(id: number): Promise<IPost> {
    const post = await this._repository.findPostById(id);
    if (!post) {
      throw new InvalidPostError("Post not found", 404);
    }
    return post;
  }
}

export default PostService;
