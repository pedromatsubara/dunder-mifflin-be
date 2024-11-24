export class NotFoundError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class DatabaseError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = "DatabaseError";
    this.statusCode = 500;
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }
}

export class BadRequestError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = "BadRequestError";
    this.statusCode = 400;
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}
