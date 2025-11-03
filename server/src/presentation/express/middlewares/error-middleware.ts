import { NextFunction, Request, Response } from "express";
import AppError from "@presentation/express/utils/error-handling/app.error";
import { BaseError } from "@presentation/express/utils/error-handling/base-error";
import { HttpStatus } from "@domain/enum/express/status-code";

export class ErrorMiddleware {
  static execute(err: any, req: Request, res: Response, next: NextFunction) {
    console.error("Error caught by middleware => ", err);

    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        status: false,
        message: err.message,
        data: err.data || null,
      });
    }

    if (err instanceof BaseError) {
      return res.status(err.statusCode).json({
        status: false,
        message: err.message,
      });
    }

    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: false,
      message: "Something went wrong. Please try again later.",
    });
  }
}
