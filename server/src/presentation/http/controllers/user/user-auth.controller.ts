import { NextFunction, Request, Response } from "express";
import AppError from "@presentation/express/utils/errors/app.error";
import { ZodError } from "zod";
import { inject, injectable } from "inversify";
import { CreateUserDTO } from "@application/dto/auth-dto/create-user.dto";
import { IBaseUseCase } from "@application/use_cases/interfaces/base-usercase.interface";
import { ResponseUserDTO } from "@application/dto/auth-dto/response-user.dto";
import { AUTH_TYPES } from "@infrastructure/inversify_di/types/auth/auth.types";
import { USER_TYPES } from "@infrastructure/inversify_di/types/user/user.types";

@injectable()
export class UserAuthController {
    constructor(
        @inject(USER_TYPES.UserSignupUseCase) private readonly _userSignupUseCase: IBaseUseCase<CreateUserDTO, ResponseUserDTO>
    ) { }

    async signup(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await this._userSignupUseCase.execute(req.body)
            return res.status(201).json(response)
        } catch (error) {
            next(error)
        }
    }
}