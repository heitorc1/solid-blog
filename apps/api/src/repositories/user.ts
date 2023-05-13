import { ICreateUser, IUser, IUserRepository } from "../interfaces/user";
import { injectable } from "inversify";
import prisma from "../config/database";

@injectable()
class UserRepository implements IUserRepository {
  async create(user: ICreateUser): Promise<IUser> {
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

  async getUserByEmail(email: string): Promise<IUser | null> {
    return prisma.user.findFirst({
      where: { email },
    });
  }
}

export default UserRepository;
