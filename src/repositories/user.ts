import { PrismaClient, User } from "@prisma/client";
import { IUser } from "../interfaces/user";
import { inject, injectable } from "inversify";
import { TYPES } from "../config/types";
import prisma from "../config/database";

@injectable()
class UserRepository {
  async create(user: IUser): Promise<User> {
    return prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
  }

  async verifyEmailExists(email: string): Promise<boolean> {
    const user = await prisma.user.findFirst({
      where: { email },
    });
    return user ? true : false;
  }

  async getPassword(
    email: string
  ): Promise<{ id: number; password: string } | null> {
    return prisma.user.findFirst({
      where: { email },
      select: { id: true, password: true },
    });
  }
}

export default UserRepository;
