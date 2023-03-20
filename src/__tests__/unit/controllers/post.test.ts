import container from "../../../config/container";
import { TYPES } from "../../../config/types";
import PostController from "../../../controllers/post";
import PostService from "../../../services/post";
import * as httpMocks from "node-mocks-http";

const controller = container.get<PostController>(TYPES.PostController);

const post = {
  title: "Test",
  content: "My content",
  published: true,
  user: {
    name: "Heitor",
    email: "heitorcarneiro1@gmail.com",
  },
};

const index = {
  data: [post],
  pagination: {
    page: 1,
    perPage: 10,
    total: 5,
  },
};

const postId = 1;

const comment = {
  text: "Nice post",
  createdAt: new Date("2023-03-20 00:00:00"),
  user: {
    name: "Heitor",
  },
};

jest.spyOn(PostService.prototype, "index").mockResolvedValue(index);
jest.spyOn(PostService.prototype, "create").mockResolvedValue(post);
jest.spyOn(PostService.prototype, "update").mockResolvedValue(post);
jest.spyOn(PostService.prototype, "createComment").mockResolvedValue(comment);

describe("index", () => {
  it("should list posts with paginations params", async () => {
    const request = httpMocks.createRequest({
      method: "GET",
      url: "/post",
      query: {
        page: "1",
        perPage: "10",
      },
    });

    const response = httpMocks.createResponse();
    const next = jest.fn();

    await controller.index(request, response, next);

    expect(response.statusCode).toBe(200);
  });

  it("should list posts without paginations params", async () => {
    const request = httpMocks.createRequest({
      method: "GET",
      url: "/post",
    });

    const response = httpMocks.createResponse();
    const next = jest.fn();

    await controller.index(request, response, next);

    expect(response.statusCode).toBe(200);
  });

  it("should not list posts with invalid paginations params", async () => {
    const request = httpMocks.createRequest({
      method: "GET",
      url: "/post",
      query: {
        page: "invalid",
        perPage: "invalid",
      },
    });

    const response = httpMocks.createResponse();
    const next = jest.fn();

    await controller.index(request, response, next);

    expect(next).toBeCalled();
  });
});

describe("create", () => {
  it("should create a new post", async () => {
    const request = httpMocks.createRequest({
      method: "POST",
      url: "/post",
      body: {
        title: "Test",
        content: "My content",
        published: true,
        userId: 1,
      },
    });

    const response = httpMocks.createResponse();
    const next = jest.fn();

    await controller.create(request, response, next);

    expect(response.statusCode).toBe(200);
  });

  it("should not create a new post without title", async () => {
    const request = httpMocks.createRequest({
      method: "POST",
      url: "/post",
      body: {
        content: "My content",
        published: true,
        userId: 1,
      },
    });

    const response = httpMocks.createResponse();
    const next = jest.fn();

    await controller.create(request, response, next);

    expect(next).toBeCalled();
  });

  it("should not create a new post without content", async () => {
    const request = httpMocks.createRequest({
      method: "POST",
      url: "/post",
      body: {
        title: "Test",
        published: true,
        userId: 1,
      },
    });

    const response = httpMocks.createResponse();
    const next = jest.fn();

    await controller.create(request, response, next);

    expect(next).toBeCalled();
  });

  it("should not create a new post without published status", async () => {
    const request = httpMocks.createRequest({
      method: "POST",
      url: "/post",
      body: {
        title: "Test",
        content: "My content",
        userId: 1,
      },
    });

    const response = httpMocks.createResponse();
    const next = jest.fn();

    await controller.create(request, response, next);

    expect(next).toBeCalled();
  });

  it("should not create a new post without user", async () => {
    const request = httpMocks.createRequest({
      method: "POST",
      url: "/post",
      body: {
        title: "Test",
        content: "My content",
        published: true,
      },
    });

    const response = httpMocks.createResponse();
    const next = jest.fn();

    await controller.create(request, response, next);

    expect(next).toBeCalled();
  });
});

describe("update", () => {
  it("should update a post", async () => {
    const request = httpMocks.createRequest({
      method: "PUT",
      url: `/post/${postId}`,
      body: {
        published: false,
      },
    });

    const response = httpMocks.createResponse();
    const next = jest.fn();

    await controller.update(request, response, next);

    expect(response.statusCode).toBe(200);
  });

  it("should not update a post with invalid parameters", async () => {
    const request = httpMocks.createRequest({
      method: "PUT",
      url: `/post/${postId}`,
      body: {
        published: "false",
      },
    });

    const response = httpMocks.createResponse();
    const next = jest.fn();

    await controller.update(request, response, next);

    expect(next).toBeCalled();
  });
});

describe("delete", () => {
  it("should delete a post", async () => {
    jest.spyOn(PostService.prototype, "delete").mockResolvedValue();

    const request = httpMocks.createRequest({
      method: "DELETE",
      url: `/post/${postId}`,
    });

    const response = httpMocks.createResponse();
    const next = jest.fn();

    await controller.delete(request, response, next);

    expect(response.statusCode).toBe(200);
  });

  it("should return an error if post not found", async () => {
    jest.spyOn(PostService.prototype, "delete").mockRejectedValue(new Error());

    const request = httpMocks.createRequest({
      method: "DELETE",
      url: `/post/130`,
    });

    const response = httpMocks.createResponse();
    const next = jest.fn();

    await controller.delete(request, response, next);

    expect(next).toBeCalled();
  });
});

describe("getPostById", () => {
  it("should return a post", async () => {
    jest.spyOn(PostService.prototype, "getPostById").mockResolvedValue(post);

    const request = httpMocks.createRequest({
      method: "GET",
      url: `/post/${postId}`,
    });

    const response = httpMocks.createResponse();
    const next = jest.fn();

    await controller.getPostById(request, response, next);

    expect(response.statusCode).toBe(200);
  });

  it("should return an error if post not found", async () => {
    jest
      .spyOn(PostService.prototype, "getPostById")
      .mockRejectedValue(new Error());

    const request = httpMocks.createRequest({
      method: "GET",
      url: `/post/${postId}`,
    });

    const response = httpMocks.createResponse();
    const next = jest.fn();

    await controller.getPostById(request, response, next);

    expect(next).toBeCalled();
  });
});

describe("createComment", () => {
  it("should create a new comment", async () => {
    const request = httpMocks.createRequest({
      method: "POST",
      url: `/post/${postId}/comments`,
      body: {
        text: "Nice post",
        userId: 1,
      },
    });

    const response = httpMocks.createResponse();
    const next = jest.fn();

    await controller.createComment(request, response, next);

    expect(response.statusCode).toBe(200);
  });

  it("should not create a new comment without text", async () => {
    const request = httpMocks.createRequest({
      method: "POST",
      url: `/post/${postId}/comments`,
      body: {
        userId: 1,
      },
    });

    const response = httpMocks.createResponse();
    const next = jest.fn();

    await controller.createComment(request, response, next);

    expect(next).toBeCalled();
  });

  it("should not create a new comment without user", async () => {
    const request = httpMocks.createRequest({
      method: "POST",
      url: `/post/${postId}/comments`,
      body: {
        text: "Nice post",
      },
    });

    const response = httpMocks.createResponse();
    const next = jest.fn();

    await controller.createComment(request, response, next);

    expect(next).toBeCalled();
  });
});
