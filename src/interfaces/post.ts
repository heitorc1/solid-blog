import { Pagination } from "./pagination";
import { IComment } from "./comment";

export interface IPost {
  title: string;
  content: string;
  published: boolean;
  user: {
    name: string;
    email: string;
  };
  comments?: IComment[];
}

export interface CreatePost {
  title: string;
  content: string;
  published: boolean;
  userId: number;
}

export interface ListPost {
  data: IPost[];
  pagination: Pagination;
}
