import InvalidPostError from "../errors/InvalidPostError";
import { CreatePost, ListPost } from "../interfaces/post";
import postRepository from "../repositories/post";

class PostService {
  async index(page: number = 1, perPage: number = 10): Promise<ListPost> {
    return postRepository.index(page, perPage);
  }

  async create(params: CreatePost): Promise<CreatePost> {
    return postRepository.create(params);
  }

  async update(id: number, params: CreatePost): Promise<CreatePost> {
    const post = await postRepository.findPostById(id);
    if (!post) {
      throw new InvalidPostError("Post not found", 404);
    }
    return postRepository.update(id, params);
  }

  async delete(id: number): Promise<void> {
    const post = await postRepository.findPostById(id);
    if (!post) {
      throw new InvalidPostError("Post not found", 404);
    }
    postRepository.delete(id);
  }
}

const postService = new PostService();
export default postService;
