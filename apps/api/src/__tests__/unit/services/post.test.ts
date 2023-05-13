import container from "../../../config/container";
import { TYPES } from "../../../config/types";
import PostService from "../../../services/post";
import PostRepository from "../../../repositories/post";
import InvalidPostError from "../../../errors/InvalidPostError";
import CommentRepository from "../../../repositories/comments";

const service = container.get<PostService>(TYPES.PostService);

const posts = {
  data: [
    {
      title: "My title",
      content: "Post content",
      published: true,
      user: {
        name: "Heitor",
        email: "heitorcarneiro1@gmail.com",
      },
      comments: [
        {
          text: "Nice post",
          createdAt: new Date("2023-03-29 12:00:00"),
          user: {
            name: "Heitor",
          },
        },
      ],
    },
  ],
  pagination: {
    page: 1,
    perPage: 10,
    total: 1,
  },
};

jest.spyOn(PostRepository.prototype, "index").mockResolvedValue(posts);
jest.spyOn(PostRepository.prototype, "create").mockResolvedValue(posts.data[0]);
jest.spyOn(PostRepository.prototype, "update").mockResolvedValue({
  ...posts.data[0],
  title: "New title",
});
jest.spyOn(PostRepository.prototype, "delete").mockResolvedValue();
jest
  .spyOn(CommentRepository.prototype, "create")
  .mockResolvedValue(posts.data[0].comments[0]);

describe("index", () => {
  it("should list posts", async () => {
    const response = await service.index();

    expect(response).toStrictEqual({
      message: "Success!",
      status: 200,
      data: posts,
    });
  });
});

describe("create", () => {
  it("should create a new post", async () => {
    const response = await service.create({
      title: "My title",
      content: "Post content",
      published: true,
      userId: 1,
    });

    expect(response).toStrictEqual({
      message: "Post created successfully!",
      status: 201,
      data: posts.data[0],
    });
  });
});

describe("update", () => {
  it("should update a post", async () => {
    jest
      .spyOn(PostRepository.prototype, "findPostById")
      .mockResolvedValue(posts.data[0]);

    const id = 1;
    const params = {
      title: "New title",
    };

    const response = await service.update(id, params);

    expect(response).toStrictEqual({
      message: "Post updated successfully!",
      status: 200,
      data: {
        ...posts.data[0],
        title: "New title",
      },
    });
  });

  it("should not update an invalid post", async () => {
    jest
      .spyOn(PostRepository.prototype, "findPostById")
      .mockResolvedValue(null);

    const id = 130;
    const params = {
      title: "New title",
    };
    try {
      await service.update(id, params);
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidPostError);
    }
  });
});

describe("delete", () => {
  it("should delete a post", async () => {
    jest
      .spyOn(PostRepository.prototype, "findPostById")
      .mockResolvedValue(posts.data[0]);

    const id = 1;

    const response = await service.delete(id);

    expect(response).toStrictEqual({
      message: "Post deleted successfully!",
      status: 200,
    });
  });

  it("should not delete an invalid post", async () => {
    jest
      .spyOn(PostRepository.prototype, "findPostById")
      .mockResolvedValue(null);

    const id = 130;

    try {
      await service.delete(id);
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidPostError);
    }
  });
});

describe("getPost", () => {
  it("should return a post", async () => {
    jest
      .spyOn(PostRepository.prototype, "findPostById")
      .mockResolvedValue(posts.data[0]);

    const id = 1;

    const response = await service.getPost(id);

    expect(response).toStrictEqual({
      message: "Success!",
      status: 200,
      data: posts.data[0],
    });
  });

  it("should not return an invalid post", async () => {
    jest
      .spyOn(PostRepository.prototype, "findPostById")
      .mockResolvedValue(null);

    const id = 1;

    try {
      await service.getPost(id);
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidPostError);
    }
  });
});

describe("createComment", () => {
  it("should create a new comment", async () => {
    jest
      .spyOn(PostRepository.prototype, "findPostById")
      .mockResolvedValue(posts.data[0]);

    const id = 1;

    const response = await service.createComment(id, {
      text: "Nice post",
      userId: 1,
    });

    expect(response).toStrictEqual({
      message: "Comment created successfully!",
      status: 201,
      data: {
        text: "Nice post",
        createdAt: new Date("2023-03-29 12:00:00"),
        user: {
          name: "Heitor",
        },
      },
    });
  });

  it("should not create a comment in an invalid post", async () => {
    jest
      .spyOn(PostRepository.prototype, "findPostById")
      .mockResolvedValue(null);

    const id = 1;

    try {
      await service.createComment(id, {
        text: "Nice post",
        userId: 1,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidPostError);
    }
  });
});
