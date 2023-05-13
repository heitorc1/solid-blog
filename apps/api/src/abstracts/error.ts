import { ICustomError } from "../interfaces/error";

export abstract class CustomError extends Error implements ICustomError {
  status: number;
  message: string;

  constructor(message: string, status: number) {
    super();
    this.message = message;
    this.status = status;
  }

  toJSON() {
    return {
      status: this.status,
      message: this.message,
    };
  }
}
