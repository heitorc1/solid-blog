import container from "../../../config/container";
import { TYPES } from "../../../config/types";
import CommentController from "../../../controllers/comment";
import CommentService from "../../../services/comment";
import * as httpMocks from "node-mocks-http";

const controller = container.get<CommentController>(TYPES.CommentController);

const updated = {
  message: "Post updated successfully!",
  status: 200,
  data: {
    text: "My comment",
    createdAt: new Date("2023-03-27 12:00:00"),
    user: {
      name: "Heitor",
    },
  },
};

const deleted = {
  message: "Post deleted successfully!",
  status: 200,
};

jest.spyOn(CommentService.prototype, "update").mockResolvedValue(updated);
jest.spyOn(CommentService.prototype, "delete").mockResolvedValue(deleted);

describe("update", () => {
  it("should update a comment", async () => {
    const request = httpMocks.createRequest({
      body: {
        text: "Nice post",
      },
      params: {
        id: "1",
      },
    });

    const response = httpMocks.createResponse();
    const next = jest.fn();

    await controller.update(request, response, next);

    expect(response.statusCode).toBe(200);
  });

  it("should not update a comment with invalid id", async () => {
    const request = httpMocks.createRequest({
      body: {
        text: "Nice post",
      },
      params: {
        id: "invalid",
      },
    });

    const response = httpMocks.createResponse();
    const next = jest.fn();

    await controller.update(request, response, next);

    expect(next).toBeCalled();
  });

  it("should not update a comment with invalid text", async () => {
    const request = httpMocks.createRequest({
      body: {
        text: 100,
      },
      params: {
        id: "1",
      },
    });

    const response = httpMocks.createResponse();
    const next = jest.fn();

    await controller.update(request, response, next);

    expect(next).toBeCalled();
  });

  it("should not update a comment with short text", async () => {
    const request = httpMocks.createRequest({
      body: {
        text: "as",
      },
      params: {
        id: "1",
      },
    });

    const response = httpMocks.createResponse();
    const next = jest.fn();

    await controller.update(request, response, next);

    expect(next).toBeCalled();
  });

  it("should not update a comment with long text", async () => {
    const request = httpMocks.createRequest({
      body: {
        text: "text text text text text text text text text text text text text text \
          text text text text text text text text text text text text text text text text \
          text text text text text text text text text text text text text text text text \
          text text text text text text text text text text text text text text text text \
          text text text text text text text text text text text text text text text text \
          text text text text text text text text text text text text text text text text \
          text text text text text text text text text text text text text text text text \
          text text text text text text text text text text text text text text text text \
          text text text text text text text text text text",
      },
      params: {
        id: "1",
      },
    });

    const response = httpMocks.createResponse();
    const next = jest.fn();

    await controller.update(request, response, next);

    expect(next).toBeCalled();
  });
});

describe("delete", () => {
  it("should delete a comment", async () => {
    const request = httpMocks.createRequest({
      params: {
        id: 1,
      },
    });

    const response = httpMocks.createResponse();
    const next = jest.fn();

    await controller.delete(request, response, next);

    expect(response.statusCode).toBe(200);
  });

  it("should not delete a comment with invalid id", async () => {
    const request = httpMocks.createRequest({
      params: {
        id: "invalid",
      },
    });

    const response = httpMocks.createResponse();
    const next = jest.fn();

    await controller.delete(request, response, next);

    expect(next).toBeCalled();
  });

  it("should not delete a comment that does not exists", async () => {
    jest
      .spyOn(CommentService.prototype, "delete")
      .mockRejectedValue(new Error());

    const request = httpMocks.createRequest({
      params: {
        id: 1,
      },
    });

    const response = httpMocks.createResponse();
    const next = jest.fn();

    await controller.delete(request, response, next);

    expect(next).toBeCalled();
  });
});
