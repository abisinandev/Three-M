import type { BaseResponseDTO } from "@application/dto/auth/base-response.dto";
import type { ResponseUserDTO } from "@application/dto/auth/response-user.dto";
import type { IBaseUseCase } from "@application/use_cases/interfaces/base-usecase.interface";
import { USER_TYPES } from "@infrastructure/inversify_di/types/user/user.types";
import type { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";

@injectable()
export class UserController {
    constructor(
        @inject(USER_TYPES.GetUserProfileUseCase) private readonly _getUserProfile: IBaseUseCase<{ userId: string }, BaseResponseDTO<ResponseUserDTO>>,
    ) { }

    async getProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            console.log(req.headers,'-----------------')
            const user = req?.user;
            const response = await this._getUserProfile.execute({ userId: user?.id as string });
            res.json(response);
        } catch (error) {
            next(error)
        }
    }
}