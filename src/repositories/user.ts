import { PrismaClient, User } from "@prisma/client";
import { IUser } from "../interfaces/user";

class UserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(user: IUser): Promise<User> {
    return this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
  }

  async getPassword(email: string): Promise<{ password: string } | null> {
    return this.prisma.user.findFirst({
      where: { email },
      select: { password: true },
    });
  }
}

const userRepository = new UserRepository();
export default userRepository;
