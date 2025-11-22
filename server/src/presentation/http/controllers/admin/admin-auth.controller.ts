import type { IAdminAuthUseCase } from "@application/use_cases/interfaces/admin/admin-auth-usecase.interface";
import type { IAdminAuthVerifyOtpUseCase } from "@application/use_cases/interfaces/admin/admin-auth-verify-otp.interface";
import { IAdminLogoutUseCase } from "@application/use_cases/interfaces/admin/admin-logout.interface";
import type { IRefreshTokenUseCase } from "@application/use_cases/interfaces/admin/admin-refresh-token.interface";
import { SuccessMessage } from "@domain/enum/express/messages/success.message";
import { HttpStatus } from "@domain/enum/express/status-code";
import { ADMIN_TYPES } from "@infrastructure/inversify_di/types/admin/admin.types";
import { ValidationError } from "@presentation/express/utils/error-handling";
import { HttpStatusCode } from "axios";
import { type NextFunction, type Request, type Response } from "express";
import { inject, injectable } from "inversify";

@injectable()
export class AdminAuthController {
    constructor(
        @inject(ADMIN_TYPES.AdminAuthUseCase) private readonly _adminAuthUseCase: IAdminAuthUseCase,
        @inject(ADMIN_TYPES.AdminAuthVerifyOtpUseCase) private readonly _adminVerifyOtpUseCase: IAdminAuthVerifyOtpUseCase,
        @inject(ADMIN_TYPES.AdminRefreshTokenUseCase) private readonly _refreshToken: IRefreshTokenUseCase,
        @inject(ADMIN_TYPES.AdminLogoutUseCase) private readonly _adminLogoutUseCase: IAdminLogoutUseCase,
    ) { }

    async authentication(req: Request, res: Response, next: NextFunction) {
        try {
            const { expiresAt, resendCount, email } = await this._adminAuthUseCase.execute(req.body);

            res.status(HttpStatus.OK).json({
                success: true,
                message: SuccessMessage.OTP_SEND,
                data: { expiresAt, resendCount, email }
            })
        } catch (error) {
            next(error)
        }
    }


    async veirfyOtp(req: Request, res: Response, next: NextFunction) {
        try {
            const { accessToken, refreshToken } = await this._adminVerifyOtpUseCase.execute(req.body);

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });

            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "lax",
                maxAge: 15 * 60 * 1000, // 15 minutes
            });


            res.status(HttpStatus.OK).json({
                success: true,
                message: SuccessMessage.LOGGED_IN_SUCCESS,
                data: { accessToken }
            })
        } catch (error) {
            next(error);
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const refreshToken = req.cookies.refreshToken;
            console.log('Refresh : ', refreshToken)
            if (!refreshToken) throw new ValidationError("No refresh token provided");

            const { accessToken } = await this._refreshToken.execute({ refreshToken });

            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "lax",
                maxAge: 15 * 60 * 1000, // 15 minutes
            })

            res.status(HttpStatus.CREATED).json({
                success: true,
                message: SuccessMessage.ACCESS_TOKEN_UPDATED
            })
        } catch (error) {
            next(error)
        }
    }


    logout(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.user?.id;
            if (id) {
                this._adminLogoutUseCase.execute({ id })
            }
            res.clearCookie("accessToken", { httpOnly: true, sameSite: "lax" });
            res.clearCookie("refreshToken", { httpOnly: true, sameSite: "lax" });

            return res.status(HttpStatusCode.Ok).json({
                success: true,
                message: SuccessMessage.LOGGED_OUT
            });
        } catch (error) {
            next(error)
        }
    }
}