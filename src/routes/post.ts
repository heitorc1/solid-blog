import { json, Request, Response, Router } from "express";
import createPostDto from "../repositories/DTO/CreatePostDTO";
import postRepository from "../repositories/post";
import updatePostDto from "../repositories/DTO/UpdatePostDTO";

const postRouter = Router();

postRouter.get("/", async (req: Request, res: Response) => {
  const posts = await postRepository.index();

  res.json(posts);
});

postRouter.post("/", async (req: Request, res: Response) => {
  const body = req.body;

  try {
    createPostDto.parse(body);
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
    updatePostDto.parse(body);
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
