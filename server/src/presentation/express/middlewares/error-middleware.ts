import { NextFunction, Request, Response } from "express";
import AppError from "@presentation/express/utils/errors/app.error";
import { BaseError } from "@presentation/express/utils/errors/base-error";

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

    return res.status(500).json({
      status: false,
      message: "Something went wrong. Please try again later.",
    });
  }
}
