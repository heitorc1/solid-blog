import { Request, Response, Router } from "express";
import { z } from "zod";
import postRepository from "../repositories/post";

const postRouter = Router();

postRouter.get("/", async (req: Request, res: Response) => {
  const posts = await postRepository.index();

  res.json(posts);
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

    const post = await postRepository.create(body);

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

    const post = await postRepository.update(parseInt(id), body);
    return res.json(post);
  } catch (error) {
    return res.json(error);
  }
});

postRouter.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await postRepository.delete(parseInt(id));
    return res.json({ message: "Post deleted successfully!" });
  } catch (error) {
    res.json(error);
  }
});

export default postRouter;
