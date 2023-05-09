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
import {
  ICategoryController,
  ICategoryRepository,
  ICategoryService,
} from "../interfaces/category";
import CategoryController from "../controllers/category";
import CategoryService from "../services/category";
import CategoryRepository from "../repositories/category";
import AuthenticationMiddleware from "../middlewares/authentication";
import { IAuthentication } from "../interfaces/authentication";

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

container
  .bind<ICategoryController>(TYPES.CategoryController)
  .to(CategoryController);
container.bind<ICategoryService>(TYPES.CategoryService).to(CategoryService);
container
  .bind<ICategoryRepository>(TYPES.CategoryRepository)
  .to(CategoryRepository);

container
  .bind<IAuthentication>(TYPES.AuthenticationMiddleware)
  .to(AuthenticationMiddleware);

export default container;
