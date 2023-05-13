import container from "../../../config/container";
import { TYPES } from "../../../config/types";
import InvalidCommentError from "../../../errors/InvalidCommentError";
import CommentRepository from "../../../repositories/comments";
import CommentService from "../../../services/comment";

const service = container.get<CommentService>(TYPES.CommentService);

const comment = {
  text: "My comment",
  createdAt: new Date("2023-03-28 12:00:00"),
  user: {
    name: "Heitor",
  },
};

describe("update", () => {
  it("should update a comment", async () => {
    const id = 1;
    const params = {
      text: "New comment",
    };
    jest.spyOn(CommentRepository.prototype, "update").mockResolvedValue({
      ...comment,
      text: params.text,
    });
    jest
      .spyOn(CommentRepository.prototype, "getCommentById")
      .mockResolvedValue(comment);

    const response = await service.update(id, params);

    expect(response).toStrictEqual({
      message: "Post updated successfully!",
      status: 200,
      data: {
        ...comment,
        text: params.text,
      },
    });
  });

  it("should not update an invalid comment", async () => {
    const id = 130;
    const params = {
      text: "New comment",
    };
    jest
      .spyOn(CommentRepository.prototype, "getCommentById")
      .mockResolvedValue(null);

    try {
      await service.update(id, params);
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidCommentError);
    }
  });
});

describe("delete", () => {
  it("should delete a comment", async () => {
    const id = 1;

    jest.spyOn(CommentRepository.prototype, "delete").mockResolvedValue();
    jest
      .spyOn(CommentRepository.prototype, "getCommentById")
      .mockResolvedValue(comment);

    const response = await service.delete(id);

    expect(response).toStrictEqual({
      message: "Post deleted successfully!",
      status: 200,
    });
  });

  it("should not delete an invalid comment", async () => {
    const id = 130;

    jest.spyOn(CommentRepository.prototype, "delete").mockResolvedValue();
    jest
      .spyOn(CommentRepository.prototype, "getCommentById")
      .mockResolvedValue(null);

    try {
      await service.delete(id);
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidCommentError);
    }
  });
});
