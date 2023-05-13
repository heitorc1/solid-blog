import "reflect-metadata";
import { AsyncContainerModule, Container } from "inversify";
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

export const bindings = new AsyncContainerModule(async (bind) => {
  bind<IUserController>(TYPES.UserController).to(UserController);
  bind<IUserService>(TYPES.UserService).to(UserService);
  bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);

  bind<IPostController>(TYPES.PostController).to(PostController);
  bind<IPostService>(TYPES.PostService).to(PostService);
  bind<IPostRepository>(TYPES.PostRepository).to(PostRepository);

  bind<ICommentController>(TYPES.CommentController).to(CommentController);
  bind<ICommentService>(TYPES.CommentService).to(CommentService);
  bind<ICommentRepository>(TYPES.CommentRepository).to(CommentRepository);

  bind<ICategoryController>(TYPES.CategoryController).to(CategoryController);
  bind<ICategoryService>(TYPES.CategoryService).to(CategoryService);
  bind<ICategoryRepository>(TYPES.CategoryRepository).to(CategoryRepository);

  bind<IAuthentication>(TYPES.AuthenticationMiddleware).to(
    AuthenticationMiddleware
  );
});

const container = new Container();
container.loadAsync(bindings);

export default container;
