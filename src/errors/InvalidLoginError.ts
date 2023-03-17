export default class InvalidLoginError extends Error {
  private statusCode: number;

  constructor(message: string, statusCode: number) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }

  public toJSON() {
    return {
      statusCode: this.statusCode,
      message: this.message,
    };
  }
}
