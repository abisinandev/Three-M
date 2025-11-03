import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import AppError from "@presentation/express/utils/error-handling/app.error";
import { ErrorMessage } from "@domain/enum/express/messages/error.message";
import { HttpStatus } from "@domain/enum/express/status-code";

export const validateDTO = (dtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = plainToInstance(dtoClass, req.body);
    console.log("dtoInstance: ", dtoInstance);
    
    const errors = await validate(dtoInstance, {
      whitelist: true, 
      forbidNonWhitelisted: true,  
      validationError: { target: false },
    });

    if (errors.length > 0) {
      const formattedErrors: Record<string, string> = {};
      errors.forEach((err) => {
        formattedErrors[err.property] = Object.values(
          err.constraints || {},
        ).join(", ");
      });

      throw new AppError(ErrorMessage.INVALID_CREDENTIALS,HttpStatus.BAD_REQUEST, { errors: formattedErrors });
    }

    req.body = dtoInstance;
    next();
  };
};
