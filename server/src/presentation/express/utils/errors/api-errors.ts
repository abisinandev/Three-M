import { BaseError } from "./base-error";
import { HttpStatus } from "./status-codes";

export class NotFoundError extends BaseError {
  constructor(description = "Resource not found") {
    super("NotFoundError", HttpStatus.NOT_FOUND, true, description);
  }
}

export class ValidationError extends BaseError {
  constructor(description = "Invalid input") {
    super("ValidationError", HttpStatus.BAD_REQUEST, true, description);
  }
}

export class InternalServerError extends BaseError {
  constructor(description = "Internal server error") {
    super(
      "InternalServerError",
      HttpStatus.INTERNAL_SERVER_ERROR,
      false,
      description,
    );
  }
}
