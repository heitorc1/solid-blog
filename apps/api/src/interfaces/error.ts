export interface IError {
  status: number;
  message: string;
}

export interface ICustomError extends IError {
  toJSON: () => IError;
}
