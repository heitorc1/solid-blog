import container from "../../../config/container";
import { TYPES } from "../../../config/types";
import UserController from "../../../controllers/user";
import UserService from "../../../services/user";
import * as httpMocks from "node-mocks-http";

const controller = container.get<UserController>(TYPES.UserController);

const user = {
  id: 1,
  name: "Heitor",
  email: "heitorcarneiro1@gmail.com",
  password: "password",
};

const token = {
  message: "User logged in",
  token: "my-jwt-token",
};

jest.spyOn(UserService.prototype, "create").mockResolvedValue(user);
jest.spyOn(UserService.prototype, "login").mockResolvedValue(token);

describe("create", () => {
  it("should create a new user", async () => {
    const request = httpMocks.createRequest({
      method: "POST",
      url: "/users/create",
      body: {
        name: "Heitor",
        email: "heitorcarneiro1@gmail.com",
        password: "password",
      },
    });

    const response = httpMocks.createResponse();
    const next = jest.fn();

    await controller.create(request, response, next);

    expect(response.statusCode).toBe(200);
  });

  it("should not create a new user without a name", async () => {
    const request = httpMocks.createRequest({
      method: "POST",
      url: "/users/create",
      body: {
        email: "heitorcarneiro1@gmail.com",
        password: "password",
      },
    });

    const response = httpMocks.createResponse();
    const next = jest.fn();

    await controller.create(request, response, next);

    expect(next).toBeCalled();
  });

  it("should not create a new user without an email", async () => {
    const request = httpMocks.createRequest({
      method: "POST",
      url: "/users/create",
      body: {
        name: "Heitor",
        password: "password",
      },
    });

    const response = httpMocks.createResponse();
    const next = jest.fn();

    await controller.create(request, response, next);

    expect(next).toBeCalled();
  });

  it("should not create a new user without a password", async () => {
    const request = httpMocks.createRequest({
      method: "POST",
      url: "/users/create",
      body: {
        name: "Heitor",
        email: "heitorcarneiro1@gmail.com",
      },
    });

    const response = httpMocks.createResponse();
    const next = jest.fn();

    await controller.create(request, response, next);

    expect(next).toBeCalled();
  });

  it("should not create a new user with a short password", async () => {
    const request = httpMocks.createRequest({
      method: "POST",
      url: "/users/create",
      body: {
        name: "Heitor",
        email: "heitorcarneiro1@gmail.com",
        password: "pass",
      },
    });

    const response = httpMocks.createResponse();
    const next = jest.fn();

    await controller.create(request, response, next);

    expect(next).toBeCalled();
  });

  it("should not create a new user with a long password", async () => {
    const request = httpMocks.createRequest({
      method: "POST",
      url: "/users/create",
      body: {
        name: "Heitor",
        email: "heitorcarneiro1@gmail.com",
        password:
          "password-password-password-password-password-password-password-password-password",
      },
    });

    const response = httpMocks.createResponse();
    const next = jest.fn();

    await controller.create(request, response, next);

    expect(next).toBeCalled();
  });
});

describe("login", () => {
  it("should return a token", async () => {
    const request = httpMocks.createRequest({
      method: "POST",
      url: "/users/login",
      body: {
        email: "heitorcarneiro1@gmail.com",
        password: "password",
      },
    });

    const response = httpMocks.createResponse();
    const next = jest.fn();

    await controller.login(request, response, next);

    expect(response.statusCode).toBe(200);
  });

  it("should not return a token without email", async () => {
    const request = httpMocks.createRequest({
      method: "POST",
      url: "/users/login",
      body: {
        email: "heitorcarneiro1@gmail.com",
      },
    });

    const response = httpMocks.createResponse();
    const next = jest.fn();

    await controller.login(request, response, next);

    expect(next).toBeCalled();
  });

  it("should not return a token without password", async () => {
    const request = httpMocks.createRequest({
      method: "POST",
      url: "/users/login",
      body: {
        password: "password",
      },
    });

    const response = httpMocks.createResponse();
    const next = jest.fn();

    await controller.login(request, response, next);

    expect(next).toBeCalled();
  });
});
