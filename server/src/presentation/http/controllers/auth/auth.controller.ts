import type { Verify2faDTO } from "@application/dto/auth/2fa-verify-dto";
import type { BaseResponseDTO } from "@application/dto/auth/base-response.dto";
import type { CreateUserDTO } from "@application/dto/auth/create-user.dto";
import type { ForgotPasswordDTO } from "@application/dto/auth/forgot-password";
import type { RefreshResponseDTO } from "@application/dto/auth/refresh-response.dto";
import type { RefreshDTO } from "@application/dto/auth/refresh.dto";
import type { ResendOtpDTO } from "@application/dto/auth/resend-otp.dto";
import type { ResetPasswordDTO } from "@application/dto/auth/reset-password";
import type { ResponseUserDTO } from "@application/dto/auth/response-user.dto";
import type { UserLoginDTO } from "@application/dto/auth/user-login.dto";
import type { VerifyOtpDTO } from "@application/dto/auth/verify-otp.dto";
import type { IBaseUseCase } from "@application/use_cases/interfaces/base-usecase.interface";
import { SuccessMessage } from "@domain/enum/express/messages/success.message";
import { HttpStatus } from "@domain/enum/express/status-code";
import { AUTH_TYPES } from "@infrastructure/inversify_di/types/auth/auth.types";
import { USER_TYPES } from "@infrastructure/inversify_di/types/user/user.types";
import { logger } from "@infrastructure/providers/logger/winston.logger";
import { ValidationError } from "@presentation/express/utils/error-handling";
import type { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";

@injectable()
export class AuthController {
    constructor(
        @inject(USER_TYPES.UserSignupUseCase) private readonly _userSignupUseCase: IBaseUseCase<CreateUserDTO, ResponseUserDTO>,
        @inject(USER_TYPES.UserLoginUseCase) private readonly _userLoginUseCase: IBaseUseCase<UserLoginDTO, ResponseUserDTO>,
        @inject(AUTH_TYPES.RefreshTokenUseCase) private readonly _refreshTokenUseCase: IBaseUseCase<RefreshDTO, RefreshResponseDTO>,
        @inject(AUTH_TYPES.LogoutUseCase) private readonly _logoutUseCase: IBaseUseCase<{ userId: string }, { success: boolean, message: string }>,
        @inject(AUTH_TYPES.VerifyTwoFactorUseCase) private readonly _verifyTwoFactorUseCase: IBaseUseCase<Verify2faDTO, { accessToken: string, refreshToken: string }>,
        @inject(AUTH_TYPES.ForgotPasswordUseCase) private readonly _forgotPasswordUseCase: IBaseUseCase<ForgotPasswordDTO, BaseResponseDTO>,
        @inject(AUTH_TYPES.SignupVerifyOtpUseCase) private readonly _verifyOtpUseCase: IBaseUseCase<VerifyOtpDTO, { message: string }>,
        @inject(AUTH_TYPES.ResendOtpUseCase) private readonly _resendOtpUseCase: IBaseUseCase<{ email: string }, { message: string }>,
        @inject(AUTH_TYPES.ForgotPasswordOtpVerifyUseCase) private readonly _forgotPassVerifyOtp: IBaseUseCase<VerifyOtpDTO, BaseResponseDTO>,
        @inject(AUTH_TYPES.ForgotPasswordResendOtpUseCase) private readonly _forgotPasswordResendOtp: IBaseUseCase<ResendOtpDTO, BaseResponseDTO<{ expiresAt: number, resendCount: number }>>,
        @inject(AUTH_TYPES.ResetPasswordUseCase) private readonly _resetPassword: IBaseUseCase<ResetPasswordDTO, BaseResponseDTO>,
    ) { }

    async signup(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await this._userSignupUseCase.execute(req.body);
            return res.json(response);
        } catch (error) {
            next(error)
        }
    }


    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await this._userLoginUseCase.execute(req.body);
            res.json(response);
        } catch (error) {
            next(error);
        }
    }


    async verifyTwoFactor(req: Request, res: Response, next: NextFunction) {
        try {
            const email = req.query.email as string;
            logger.info(email);
            const { token } = req.body;

            const { accessToken, refreshToken } = await this._verifyTwoFactorUseCase.execute({ email, token });

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


            return res.json({
                success: true,
                message: SuccessMessage.LOGGED_IN_SUCCESS,
                statusCode: 200,
                data: { accessToken: "Created" }
            })

        } catch (error) {
            next(error)
        }
    }

    async verifySignupOtp(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const response = await this._verifyOtpUseCase.execute(req.body);
            res.status(HttpStatus.OK).json(response);
        } catch (err) {
            next(err)
        }
    }


    async resendOtp(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;
            const response = await this._resendOtpUseCase.execute({ email })
            res.status(HttpStatus.OK).json(response)
        } catch (err) {
            next(err)
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const refreshToken = req.cookies.refreshToken;
            console.log('Refresh : ', refreshToken)
            if (!refreshToken) throw new ValidationError("No refresh token provided");

            const response = await this._refreshTokenUseCase.execute({ refreshToken })

            res.cookie("accessToken", response.accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "lax",
                maxAge: 15 * 60 * 1000, // 15 minutes
            });
            return res.json({ success: true, message: response.message })

        } catch (error) {
            next(error)
        }
    }


    async forgotPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await this._forgotPasswordUseCase.execute(req.body);
            return res.json(response);
        } catch (error) {
            next(error)
        }
    }

    async forgotPasswordVeirfyOtp(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await this._forgotPassVerifyOtp.execute(req.body);
            res.status(HttpStatus.OK).json(response);
        } catch (error) {
            next(error)
        }
    }

    async forgotPasswordResendOtp(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await this._forgotPasswordResendOtp.execute(req.body);
            res.status(HttpStatus.OK).json(response)
        } catch (err) {
            next(err)
        }
    }

    async resetPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await this._resetPassword.execute(req.body)
            return res.json(response);
        } catch (error) {
            next(error)
        }
    }

    logout(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.id;
            if (userId) {
                this._logoutUseCase.execute({ userId })
            }
            res.clearCookie("accessToken", { httpOnly: true, sameSite: "lax" });
            res.clearCookie("refreshToken", { httpOnly: true, sameSite: "lax" });

            return res.status(200).json({ success: true, message: "Logged out successfully" });
        } catch (error) {
            next(error)
        }
    }
}