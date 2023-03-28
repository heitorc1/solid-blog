import { Controller } from "./controller";
import { IResponse } from "./response";

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
  token: string;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface IUserController {
  create: Controller<void>;
  login: Controller<void>;
}

export interface IUserService {
  create: (params: ICreateUser) => Promise<IResponse<IUser>>;
  login: (params: ILogin) => Promise<IResponse<IToken>>;
}

export interface IUserRepository {
  create: (params: ICreateUser) => Promise<IUser>;
  verifyEmailExists: (email: string) => Promise<boolean>;
  getUserByEmail: (email: string) => Promise<IUser | null>;
}
