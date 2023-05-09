import "reflect-metadata";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { errorHandler } from "./middlewares/errorHandler";
import morgan from "morgan";
import { InversifyExpressServer } from "inversify-express-utils";
import container from "./config/container";

const server = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.use(helmet());
  app.use(cors());
  app.use(morgan("dev"));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(errorHandler);
});

const app = server.build();
const port = 8080;

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
