import type { BaseResponseDTO } from "@application/dto/auth/base-response.dto";
import type { ResponseUserDTO } from "@application/dto/auth/response-user.dto";
import type { ChangePasswordDTO } from "@application/dto/user/change-password.dto";
import type { IBaseUseCase } from "@application/use_cases/interfaces/base-usecase.interface";
import { USER_TYPES } from "@infrastructure/inversify_di/types/user/user.types";
import type { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";

@injectable()
export class UserController {
    constructor(
        @inject(USER_TYPES.GetUserProfileUseCase) private readonly _getUserProfile: IBaseUseCase<{ userId: string }, BaseResponseDTO<ResponseUserDTO>>,
        @inject(USER_TYPES.ChangePasswordUseCase) private readonly _changePassword: IBaseUseCase<{ userId: string, data: ChangePasswordDTO }, BaseResponseDTO>,
    ) { }

    async getProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = req?.user;
            const response = await this._getUserProfile.execute({ userId: user?.id as string });
            res.json(response);
        } catch (error) {
            next(error)
        }
    }

    async ChangePassord(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.user?.id
            console.log('jwt payload: ', req.user);
            if (!userId) return
            const response = await this._changePassword.execute({
                userId,
                data: req.body
            });
            res.json(response);
        } catch (error) {
            next(error)
        }
    }
}