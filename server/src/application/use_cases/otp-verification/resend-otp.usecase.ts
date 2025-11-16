import type { IUserRepository } from "@application/interfaces/repositories/user-repository.interface";
import type { IEmailService } from "@application/interfaces/services/auth/email.service.interface";
import { AUTH_TYPES } from "@infrastructure/inversify_di/types/auth/auth.types";
import { USER_TYPES } from "@infrastructure/inversify_di/types/user/user.types";
import { redisClient } from "@infrastructure/providers/redis/redis.provider";
import AppError from "@presentation/express/utils/error-handling/app.error";
import { generateOtp } from "@shared/utils/otp-generator";
import { inject, injectable } from "inversify";
import type { IBaseUseCase } from "../interfaces/base-usecase.interface";
import { HttpStatus } from "@domain/enum/express/status-code";
import type { BaseResponseDTO } from "@application/dto/auth/base-response.dto";


@injectable()
export class ResendOtpUseCase implements IBaseUseCase<{ email: string }, BaseResponseDTO<{ expiresAt: number, resendCount: number }>> {
    constructor(
        @inject(USER_TYPES.IUserRepository) private readonly _userRepository: IUserRepository,
        @inject(AUTH_TYPES.IEmailService) private readonly _emailVerifyService: IEmailService,
    ) { }
    async execute(prop: { email: string }): Promise<BaseResponseDTO<{ expiresAt: number, resendCount: number }>> {

        const user = await this._userRepository.findByField('email', prop.email);
        const otp = generateOtp();
        const expiryTime = 5 * 60;
        const expiresAt = Date.now() + expiryTime * 1000;

        if (!user) throw new AppError('User not found', 404);
        if (user.isEmailVerified) throw new AppError('Email already verified', 400);

        const otpData = await redisClient.hgetall(`otp:${user.email}`);

        if (otpData) {
            const now = Date.now();

            if (otpData.lastResendAt && now - Number(otpData.lastResendAt) < 30000) {
                throw new AppError('Please wait before requesting another OTP', 429);
            }

            if (Number(otpData.resendCount) >= 4) {
                throw new AppError('Maximum resend attempts reached', 429);
            }
        }

        await this._emailVerifyService.sendOtpEmail(prop.email, otp);
        return {
            success: true,
            message: 'New OTP sent to your email.',
            statusCode: HttpStatus.OK,
            data: { expiresAt, resendCount: 0 }
        };
    }
}