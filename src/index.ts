import { Request, Response } from "express";
import express from "express";
import * as dotenv from "dotenv";
import postRouter from "./routes/post";

dotenv.config();

const app = express();
const port = 8080;

app.use(express.json());

app.use("/posts", postRouter);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
