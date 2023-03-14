import { z, ZodSchema } from "zod";
import { IPost } from "../../interfaces/post";

class UpdatePostDTO {
  private post: ZodSchema;

  constructor() {
    this.post = z
      .object({
        title: z.string(),
        content: z.string(),
        published: z.boolean(),
      })
      .strict()
      .partial();
  }

  parse(body: IPost) {
    this.post.parse(body);
  }
}

const updatePostDto = new UpdatePostDTO();
export default updatePostDto;
