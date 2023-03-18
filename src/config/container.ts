import "reflect-metadata";
import { Container } from "inversify";
import UserController from "../controllers/user";
import UserRepository from "../repositories/user";
import UserService from "../services/user";
import { TYPES } from "./types";
import PostController from "../controllers/post";
import PostService from "../services/post";
import PostRepository from "../repositories/post";

const container = new Container();

container.bind<UserController>(TYPES.UserController).to(UserController);
container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<PostController>(TYPES.PostController).to(PostController);
container.bind<PostService>(TYPES.PostService).to(PostService);
container.bind<PostRepository>(TYPES.PostRepository).to(PostRepository);

export default container;
