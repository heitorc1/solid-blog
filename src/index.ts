import express, { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { authenticate } from "./middlewares/authentication";
import postRouter from "./routes/post";
import userRouter from "./routes/user";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

app.use(authenticate);

app.use("/posts", postRouter);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ZodError) {
    return res.status(422).json(error);
  }

  if (error.toJSON) {
    return res.status(error.statusCode).json({ message: error.message });
  }
  res.status(500).json(error);
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
