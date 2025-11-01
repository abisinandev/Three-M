 
import { HttpStatus } from "@domain/enum/express/status-code.enum";
import { BaseError } from "./base-error";

export default class AppError extends BaseError {
  public readonly data?: unknown;

  constructor(
    message: string,
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
    data?: unknown,
  ) {
    super("AppError", statusCode, true, message);
    this.data = data;
  }
}
 