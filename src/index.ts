import { Request, Response } from "express";
import express from "express";

const app = express();
const port = 8080;

app.get("/", (req: Request, res: Response) => {
  res.send("ok");
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
