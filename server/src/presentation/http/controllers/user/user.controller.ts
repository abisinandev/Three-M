import type { IChangePasswordUseCase } from "@application/use_cases/interfaces/user/change-password.usecase.interface";
import type { IUserProfileInterface } from "@application/use_cases/interfaces/user/user-profile-usecase.interface";
import { SuccessMessage } from "@domain/enum/express/messages/success.message";
import { HttpStatus } from "@domain/enum/express/status-code";
import { USER_TYPES } from "@infrastructure/inversify_di/types/user/user.types";
import type { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";

@injectable()
export class UserController {
    constructor(
        @inject(USER_TYPES.GetUserProfileUseCase) private readonly _getUserProfile: IUserProfileInterface,
        @inject(USER_TYPES.ChangePasswordUseCase) private readonly _changePassword: IChangePasswordUseCase,
    ) { }

    async getProfile(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req?.user;
            const result = await this._getUserProfile.execute({ userId: user?.id as string });
            res.status(HttpStatus.OK).json({
                success: true,
                message: SuccessMessage.DATA_FETCHED,
                data: result
            });
        } catch (error) {
            next(error)
        }
    }

    async ChangePassord(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.id
            console.log('jwt payload: ', req.user);
            if (!userId) return

            await this._changePassword.execute({
                userId,
                data: req.body
            });
            return res.status(HttpStatus.OK).json({
                success: true,
                message: SuccessMessage.PASSWORD_CHANGED,
            })

        } catch (error) {
            next(error)
        }
    }
}