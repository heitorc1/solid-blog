export interface IComment {
  text: string;
  createdAt: Date;
  user: {
    name: string;
  };
}

export interface CreateComment {
  text: string;
  userId: number;
}
