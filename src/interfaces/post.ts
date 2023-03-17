export interface CreatePost {
  title: string;
  content: string;
  published: boolean;
  userId: number;
}

export interface ListPost {
  title: string;
  content: string;
  published: boolean;
  user: {
    name: string;
    email: string;
  };
}
