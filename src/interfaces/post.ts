import { Pagination } from "./pagination";

export interface Post {
  title: string;
  content: string;
  published: boolean;
  user: {
    name: string;
    email: string;
  };
}

export interface CreatePost {
  title: string;
  content: string;
  published: boolean;
  userId: number;
}

export interface ListPost {
  data: Post[];
  pagination: Pagination;
}
