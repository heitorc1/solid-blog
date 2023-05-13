import { sign } from "jsonwebtoken";
import { JWT_SECRET } from "../config/envs";
import { IUser } from "../interfaces/user";

export function createToken(user: IUser): string {
  return sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    JWT_SECRET,
    {
      expiresIn: 4 * 60 * 60,
    }
  );
}
