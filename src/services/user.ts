import bcrypt from "bcrypt";
import { ILogin, IUser } from "../interfaces/user";
import { User } from "@prisma/client";
import InvalidLoginError from "../errors/InvalidLoginError";
import { sign } from "jsonwebtoken";
import UserRepository from "../repositories/user";
import { inject, injectable } from "inversify";
import { TYPES } from "../config/types";
import { JWT_SECRET } from "../config/envs";

@injectable()
class UserService {
  private _repository: UserRepository;

  constructor(@inject(TYPES.UserRepository) repository: UserRepository) {
    this._repository = repository;
  }

  async create(params: IUser): Promise<User> {
    const userAlreadyExists = await this._repository.verifyEmailExists(
      params.email
    );

    if (userAlreadyExists) {
      throw new InvalidLoginError("Email already registered", 404);
    }

    const hashedPassword = await bcrypt.hash(params.password, 10);

    return this._repository.create({
      ...params,
      password: hashedPassword,
    });
  }

  async login(params: ILogin): Promise<string> {
    const user = await this._repository.getPassword(params.email);

    if (!user) {
      throw new InvalidLoginError("User not found", 404);
    }

    const isSamePassword = await bcrypt.compare(params.password, user.password);

    if (!isSamePassword) {
      throw new InvalidLoginError("Incorrect password", 404);
    }

    const token = sign(
      {
        id: user.id,
        email: params.email,
      },
      JWT_SECRET,
      {
        expiresIn: 4 * 60 * 60,
      }
    );
    return token;
  }
}

export default UserService;
