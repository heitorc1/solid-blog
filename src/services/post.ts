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

  async index(page = 1, perPage = 10): Promise<IListPost> {
    return this._repository.index(page, perPage);
  }

  async create(params: ICreatePost): Promise<IPost> {
    return this._repository.create(params);
  }

  async update(id: number, params: ICreatePost): Promise<IPost> {
    const post = await this._repository.findPostById(id);
    if (!post) {
      throw new InvalidPostError("Post not found", 404);
    }
    return this._repository.update(id, params);
  }

  async delete(id: number): Promise<void> {
    const post = await this._repository.findPostById(id);
    if (!post) {
      throw new InvalidPostError("Post not found", 404);
    }
    return this._repository.delete(id);
  }

  async getPostById(id: number): Promise<IPost> {
    const post = await this._repository.findPostById(id);
    if (!post) {
      throw new InvalidPostError("Post not found", 404);
    }
    return post;
  }

  async createComment(id: number, params: ICreateComment): Promise<IComment> {
    await this.getPostById(id);
    return this._commentRepository.create(id, params);
  }
}

export default PostService;
