import { Request, Response, Router } from "express";
import { z } from "zod";
import postService from "../services/post";

const postRouter = Router();

postRouter.get("/", async (req: Request, res: Response) => {
  const params = req.query;

  try {
    const validatedData = z
      .object({
        page: z.string().optional(),
        perPage: z.string().optional(),
      })
      .parse(params);

    const posts = await postService.index(
      validatedData.page ? parseInt(validatedData.page) : undefined,
      validatedData.perPage ? parseInt(validatedData.perPage) : undefined
    );
    res.json(posts);
  } catch (error) {
    console.log(error);
  }
});

postRouter.post("/", async (req: Request, res: Response) => {
  const body = req.body;

  try {
    z.object({
      title: z.string(),
      content: z.string(),
      published: z.boolean(),
      userId: z.number(),
    }).parse(body);

    const post = await postService.create(body);

    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

postRouter.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body;

  try {
    z.object({
      title: z.string().optional(),
      content: z.string().optional(),
      published: z.boolean().optional(),
    }).parse(body);

    const post = await postService.update(parseInt(id), body);
    return res.json(post);
  } catch (error) {
    return res.json(error);
  }
});

postRouter.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await postService.delete(parseInt(id));
    return res.json({ message: "Post deleted successfully!" });
  } catch (error) {
    res.json(error);
  }
});

export default postRouter;
