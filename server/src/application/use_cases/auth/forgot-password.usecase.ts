import type { BaseResponseDTO } from "@application/dto/auth/base-response.dto";
import type { IBaseUseCase } from "../interfaces/base-usecase.interface";
import { inject, injectable } from "inversify";
import { USER_TYPES } from "@infrastructure/inversify_di/types/user/user.types";
import type { IUserRepository } from "@application/interfaces/repositories/user-repository.interface";
import { SuccessMessage } from "@domain/enum/express/messages/success.message";
import { NotFoundError } from "@presentation/express/utils/error-handling";
import { AUTH_TYPES } from "@infrastructure/inversify_di/types/auth/auth.types";
import type { IEmailService } from "@application/interfaces/services/auth/email.service.interface";
import { generateOtp } from "@shared/utils/otp-generator";
import { redisClient } from "@infrastructure/providers/redis/redis.provider";

@injectable()
export class ForgotPasswordUseCase implements IBaseUseCase<{ email: string }, BaseResponseDTO> {

    constructor(
        @inject(USER_TYPES.UserRepository) private readonly _userRepository: IUserRepository,
        @inject(AUTH_TYPES.IEmailService) private readonly _emailService: IEmailService,
    ) { }

    async execute(req: { email: string; }): Promise<BaseResponseDTO<unknown>> {

        const user = await this._userRepository.findByField('email', req.email);
        if (!user) throw new NotFoundError("User doest not exist");

        const redisKey = `forgot-password-otp:${req.email}`;
        const otp = generateOtp();
        const expiryTime = 5 * 60;
        const expiresAt = Date.now() + expiryTime * 1000;
        const now = Date.now();
        const resendCount = 0;

        await redisClient.hmset(redisKey, {
            email: req.email,
            otp,
            expiresAt,
            resendCount,
            lastResendAt: now
        });
        await redisClient.expire(redisKey, 300);

        await this._emailService.sendOtpEmail(req.email, otp);
        return {
            success: true,
            message: SuccessMessage.VERIFYCATION_CODE_SEND,
            statusCode: 200,
        }
    }
}