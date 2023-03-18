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
import {
  IUserController,
  IUserRepository,
  IUserService,
} from "../interfaces/user";
import {
  IPostController,
  IPostRepository,
  IPostService,
} from "../interfaces/post";
import {
  ICommentController,
  ICommentRepository,
  ICommentService,
} from "../interfaces/comment";

const container = new Container();

container.bind<IUserController>(TYPES.UserController).to(UserController);
container.bind<IUserService>(TYPES.UserService).to(UserService);
container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);

container.bind<IPostController>(TYPES.PostController).to(PostController);
container.bind<IPostService>(TYPES.PostService).to(PostService);
container.bind<IPostRepository>(TYPES.PostRepository).to(PostRepository);

container
  .bind<ICommentController>(TYPES.CommentController)
  .to(CommentController);
container.bind<ICommentService>(TYPES.CommentService).to(CommentService);
container
  .bind<ICommentRepository>(TYPES.CommentRepository)
  .to(CommentRepository);

export default container;
