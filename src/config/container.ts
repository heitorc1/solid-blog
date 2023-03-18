import "reflect-metadata";
import { Container } from "inversify";
import UserController from "../controllers/user";
import UserRepository from "../repositories/user";
import UserService from "../services/user";
import { TYPES } from "./types";

const container = new Container();

container.bind<UserController>(TYPES.UserController).to(UserController);
container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);

export default container;
