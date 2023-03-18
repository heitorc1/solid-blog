import { NextFunction, Request, Response, Router } from "express";
import { z } from "zod";
import commentService from "../services/comment";

const commentRouter = Router();

commentRouter.put(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const body = req.body;

    try {
      const validatedData = z.object({ text: z.string() }).parse(body);

      const comment = await commentService.update(parseInt(id), validatedData);
      return res.json(comment);
    } catch (error) {
      next(error);
    }
  }
);

commentRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      await commentService.delete(parseInt(id));
      return res.json({ message: "Comment deleted successfully!" });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

export default commentRouter;
