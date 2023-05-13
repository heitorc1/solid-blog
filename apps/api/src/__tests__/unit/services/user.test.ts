import container from "../../../config/container";
import { TYPES } from "../../../config/types";
import UserRepository from "../../../repositories/user";
import UserService from "../../../services/user";
import bcrypt from "bcrypt";
import InvalidLoginError from "../../../errors/InvalidLoginError";
import * as hashPassword from "../../../lib/hashPassword";
import * as jwt from "../../../lib/jwt";

const service = container.get<UserService>(TYPES.UserService);

describe("create", () => {
  const params = {
    name: "Heitor",
    email: "heitorcarneiro1@gmail.com",
    password: "password",
  };

  it("should create a new user", async () => {
    const hashedPassword = await bcrypt.hash(params.password, 10);

    jest
      .spyOn(UserRepository.prototype, "verifyEmailExists")
      .mockResolvedValue(false);
    jest.spyOn(UserRepository.prototype, "create").mockResolvedValue({
      ...params,
      id: 1,
      password: hashedPassword,
    });

    const response = await service.create(params);

    expect(response).toStrictEqual({
      message: "User created successfully!",
      status: 201,
      data: {
        ...params,
        id: 1,
        password: hashedPassword,
      },
    });
  });

  it("should not create a new user if email already exists", async () => {
    jest
      .spyOn(UserRepository.prototype, "verifyEmailExists")
      .mockResolvedValue(true);

    try {
      await service.create(params);
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidLoginError);
    }
  });
});

describe("login", () => {
  const params = {
    email: "heitorcarneiro1@gmail.com",
    password: "password",
  };

  const existingUser = {
    id: 1,
    name: "Heitor",
    email: "heitorcarneiro1@gmail.com",
    password: "password",
  };

  it("should login with valid credentials", async () => {
    const token = "my-jwt-token";

    jest
      .spyOn(UserRepository.prototype, "getUserByEmail")
      .mockResolvedValue(existingUser);
    jest.spyOn(hashPassword, "comparePassword").mockResolvedValue(true);
    jest.spyOn(jwt, "createToken").mockReturnValue(token);

    const response = await service.login(params);

    expect(response).toStrictEqual({
      message: "User logged in",
      status: 200,
      data: { token },
    });
  });

  it("should not login with invalid email", async () => {
    jest
      .spyOn(UserRepository.prototype, "getUserByEmail")
      .mockResolvedValue(null);

    try {
      await service.login(params);
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidLoginError);
    }
  });

  it("should not login with invalid password", async () => {
    jest
      .spyOn(UserRepository.prototype, "getUserByEmail")
      .mockResolvedValue(existingUser);
    jest.spyOn(hashPassword, "comparePassword").mockResolvedValue(false);

    try {
      await service.login(params);
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidLoginError);
    }
  });
});
