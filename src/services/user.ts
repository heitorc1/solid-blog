import userRepository from "../repositories/user";
import bcrypt from "bcrypt";
import { ILogin, IUser } from "../interfaces/user";
import { User } from "@prisma/client";
import InvalidLoginError from "../errors/InvalidLoginError";
import { sign } from "jsonwebtoken";
import { JWT_SECRET } from "../envs";

class UserService {
  async create(params: IUser): Promise<User> {
    const userAlreadyExists = await userRepository.verifyEmailExists(
      params.email
    );

    if (userAlreadyExists) {
      throw new InvalidLoginError("Email already registered", 404);
    }

    const hashedPassword = await bcrypt.hash(params.password, 10);

    return userRepository.create({
      ...params,
      password: hashedPassword,
    });
  }

  async login(params: ILogin): Promise<string> {
    const user = await userRepository.getPassword(params.email);

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

const userService = new UserService();
export default userService;
