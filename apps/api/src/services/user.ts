import {
  ILogin,
  ICreateUser,
  IUser,
  IToken,
  IUserService,
} from "../interfaces/user";
import InvalidLoginError from "../errors/InvalidLoginError";
import UserRepository from "../repositories/user";
import { inject, injectable } from "inversify";
import { TYPES } from "../config/types";
import { IResponse } from "../interfaces/response";
import { comparePassword, hashPassword } from "../lib/hashPassword";
import { createToken } from "../lib/jwt";

@injectable()
class UserService implements IUserService {
  private _repository: UserRepository;

  constructor(@inject(TYPES.UserRepository) repository: UserRepository) {
    this._repository = repository;
  }

  async create(params: ICreateUser): Promise<IResponse<IUser>> {
    const userAlreadyExists = await this._repository.verifyEmailExists(
      params.email
    );

    if (userAlreadyExists) {
      throw new InvalidLoginError("Email already registered", 404);
    }

    const hashedPassword = await hashPassword(params.password);

    const user = await this._repository.create({
      ...params,
      password: hashedPassword,
    });

    return {
      message: "User created successfully!",
      status: 201,
      data: user,
    };
  }

  async login(params: ILogin): Promise<IResponse<IToken>> {
    const user = await this._repository.getUserByEmail(params.email);

    if (!user) {
      throw new InvalidLoginError("User not found", 404);
    }

    const isSamePassword = await comparePassword(
      params.password,
      user.password
    );

    if (!isSamePassword) {
      throw new InvalidLoginError("Incorrect password", 404);
    }

    const token = createToken(user);
    return { message: "User logged in", status: 200, data: { token } };
  }
}

export default UserService;
