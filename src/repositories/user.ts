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

  async verifyEmailExists(email: string): Promise<boolean> {
    const user = await this.prisma.user.findFirst({
      where: { email },
    });
    return user ? true : false;
  }

  async getPassword(
    email: string
  ): Promise<{ id: number; password: string } | null> {
    return this.prisma.user.findFirst({
      where: { email },
      select: { id: true, password: true },
    });
  }
}

const userRepository = new UserRepository();
export default userRepository;
