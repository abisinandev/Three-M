import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import AppError from "@presentation/express/utils/errors/app.error";

export const validateDTO = (dtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = plainToInstance(dtoClass, req.body);
    console.log("dtoInstance: ", dtoInstance);
    const errors = await validate(dtoInstance, {
      whitelist: true, // only allow defined fields
      forbidNonWhitelisted: true, // throw if unexpected fields
      validationError: { target: false },
    });

    if (errors.length > 0) {
      const formattedErrors: Record<string, string> = {};
      errors.forEach((err) => {
        formattedErrors[err.property] = Object.values(
          err.constraints || {},
        ).join(", ");
      });

      throw new AppError("Invalid input", 400, { errors: formattedErrors });
    }

    req.body = dtoInstance;
    next();
  };
};
