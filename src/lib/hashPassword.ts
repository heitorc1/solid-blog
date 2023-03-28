import bcrypt from "bcrypt";

export async function comparePassword(
  firstPassword: string,
  secondPassword: string
): Promise<boolean> {
  return await bcrypt.compare(firstPassword, secondPassword);
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}
