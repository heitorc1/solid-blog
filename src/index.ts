import express, { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { authenticate } from "./middlewares/authentication";
import commentRouter from "./routes/comment";
import postRouter from "./routes/post";
import userRouter from "./routes/user";
import { CustomError } from "./abstracts/error";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

app.use(authenticate);

app.use("/posts", postRouter);
app.use("/comments", commentRouter);

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
app.use((error: any, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof ZodError) {
    return res.status(422).json(error);
  }

  if (error instanceof CustomError) {
    return res.status(error.status).json(error.toJSON());
  }
  console.error(error);
  res.status(500).json(error);
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
