import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import UserController from "../controllers/user";
import UserRepository from "../repositories/user";
import UserService from "../services/user";
import PostController from "../controllers/post";
import PostService from "../services/post";
import PostRepository from "../repositories/post";
import CommentController from "../controllers/comment";
import CommentService from "../services/comment";
import CommentRepository from "../repositories/comments";

const container = new Container();

container.bind<UserController>(TYPES.UserController).to(UserController);
container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);

container.bind<PostController>(TYPES.PostController).to(PostController);
container.bind<PostService>(TYPES.PostService).to(PostService);
container.bind<PostRepository>(TYPES.PostRepository).to(PostRepository);

container
  .bind<CommentController>(TYPES.CommentController)
  .to(CommentController);
container.bind<CommentService>(TYPES.CommentService).to(CommentService);
container
  .bind<CommentRepository>(TYPES.CommentRepository)
  .to(CommentRepository);

export default container;
