import { Controller } from "./controller";

export interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IToken {
  message: string;
  token: string;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

export type IGetUserByEmail = Omit<IUser, "name"> | null;

export interface IUserController {
  create: Controller<void>;
  login: Controller<void>;
}

export interface IUserService {
  create: (params: ICreateUser) => Promise<IUser>;
  login: (params: ILogin) => Promise<IToken>;
}

export interface IUserRepository {
  create: (params: ICreateUser) => Promise<IUser>;
  verifyEmailExists: (email: string) => Promise<boolean>;
  getUserByEmail: (email: string) => Promise<IGetUserByEmail>;
}
