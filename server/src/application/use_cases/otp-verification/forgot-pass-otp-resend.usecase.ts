import { inject, injectable } from "inversify";
import type { IBaseUseCase } from "../interfaces/base-usecase.interface";
import type { ResendOtpDTO } from "@application/dto/auth/resend-otp.dto";
import type { BaseResponseDTO } from "@application/dto/auth/base-response.dto";
import { USER_TYPES } from "@infrastructure/inversify_di/types/user/user.types";
import type { IUserRepository } from "@application/interfaces/repositories/user-repository.interface";
import type { IEmailService } from "@application/interfaces/services/auth/email.service.interface";
import { AUTH_TYPES } from "@infrastructure/inversify_di/types/auth/auth.types";
import { HttpStatus } from "@domain/enum/express/status-code";
import { NotFoundError } from "@presentation/express/utils/error-handling";
import { redisClient } from "@infrastructure/providers/redis/redis.provider";
import AppError from "@presentation/express/utils/error-handling/app.error";
import { generateOtp } from "@shared/utils/otp-generator";
import { SuccessMessage } from "@domain/enum/express/messages/success.message";

@injectable()
export class ForgotPasswordResendOtpUseCase implements IBaseUseCase<ResendOtpDTO, BaseResponseDTO<{ expiresAt: number, resendCount: number }>> {
    constructor(
        @inject(USER_TYPES.UserRepository) private readonly _userRepository: IUserRepository,
        @inject(AUTH_TYPES.IEmailService) private readonly _emailService: IEmailService
    ) { }

    async execute(req: ResendOtpDTO): Promise<BaseResponseDTO<{ expiresAt: number, resendCount: number }>> {

        const { email } = req;

        const user = await this._userRepository.findByField("email", email);
        if (!user) throw new NotFoundError("User not found");

        const redisKey = `forgot-password-otp:${email}`;

        const otpData = await redisClient.hgetall(redisKey);

        const now = Date.now();
        let resendCount = 0;

        if (otpData?.otp) {

            if (otpData.lastResendAt && (now - Number(otpData.lastResendAt)) < 30000) {
                throw new AppError("Please wait 30 seconds before requesting another OTP", HttpStatus.TOO_MANY_REQUESTS);
            }

            if (otpData.resendCount && Number(otpData.resendCount) >= 5) {
                throw new AppError("Maximum resend attempts reached", HttpStatus.TOO_MANY_REQUESTS);
            }

            resendCount = Number(otpData.resendCount) + 1;
        }

        const otp = generateOtp();
        const expiresAt = now + (5 * 60 * 1000);

        await redisClient.hmset(redisKey, {
            email,
            otp,
            expiresAt,
            resendCount,
            lastResendAt: now
        });

        await redisClient.expire(redisKey, 300);

        await this._emailService.sendOtpEmail(email, otp);

        return {
            success: true,
            message: SuccessMessage.RESEND_OTP_MSG,
            statusCode: HttpStatus.OK,
            data: { expiresAt, resendCount }
        };
    }
}