import { z, ZodSchema } from "zod";
import { IPost } from "../../interfaces/post";

class CreatePostDTO {
  private post: ZodSchema;

  constructor() {
    this.post = z
      .object({
        title: z.string(),
        content: z.string(),
        published: z.boolean(),
      })
      .strict()
      .required();
  }

  parse(body: IPost) {
    this.post.parse(body);
  }
}

const createPostDto = new CreatePostDTO();
export default createPostDto;
