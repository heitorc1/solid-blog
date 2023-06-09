export const TYPES = {
  UserController: Symbol.for("UserController"),
  UserService: Symbol.for("UserService"),
  UserRepository: Symbol.for("UserRepository"),

  PostController: Symbol.for("PostController"),
  PostService: Symbol.for("PostService"),
  PostRepository: Symbol.for("PostRepository"),

  CommentController: Symbol.for("CommentController"),
  CommentService: Symbol.for("CommentService"),
  CommentRepository: Symbol.for("CommentRepository"),

  CategoryController: Symbol.for("CategoryController"),
  CategoryService: Symbol.for("CategoryService"),
  CategoryRepository: Symbol.for("CategoryRepository"),

  AuthenticationMiddleware: Symbol.for("AuthenticationMiddleware"),
};
