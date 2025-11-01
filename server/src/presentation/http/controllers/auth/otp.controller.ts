import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IBaseUseCase } from "@application/use_cases/interfaces/base-usercase.interface";
import { AUTH_TYPES } from "@infrastructure/inversify_di/types/auth/auth.types";

@injectable()
export class OtpController {

    constructor(
        @inject(AUTH_TYPES.VerifyOtpUseCase)
        private readonly _verifyOtpUseCase: IBaseUseCase<{ email: string, otp: string }, { message: string }>,

        @inject(AUTH_TYPES.ResendOtpUseCase)
        private readonly _resendOtpUseCase: IBaseUseCase<{ email: string }, { message: string }>
    ) { }

    async verifyOtp(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const response = await this._verifyOtpUseCase.execute(req.body);
            res.status(200).json(response);

        } catch (err) {
            next(err)
        }
    }


    async resendOtp(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;

            const response = await this._resendOtpUseCase.execute(email)
            res.status(200).json(response)

        } catch (err) {
            next(err)
        }
    }
}