import express from "express";
import postRouter from "./routes/post";
import userRouter from "./routes/user";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/posts", postRouter);
app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
