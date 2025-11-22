import { injectable, inject } from "inversify";
import crypto from "node:crypto";
import type { IBaseUseCase } from "../interfaces/base-usecase.interface";
import type { VerifyOtpDTO } from "@application/dto/auth/verify-otp.dto";
import type { BaseResponseDTO } from "@application/dto/auth/base-response.dto";
import type { IUserRepository } from "@application/interfaces/repositories/user-repository.interface";
import { USER_TYPES } from "@infrastructure/inversify_di/types/user/user.types";
import { redisClient } from "@infrastructure/providers/redis/redis.provider";
import { ValidationError, NotFoundError } from "@presentation/express/utils/error-handling";
import { ErrorMessage } from "@domain/enum/express/messages/error.message";
import { HttpStatus } from "@domain/enum/express/status-code";


@injectable()
export class ForgotPasswordOtpVerifyUseCase implements IBaseUseCase<VerifyOtpDTO, BaseResponseDTO> {

    constructor(
        @inject(USER_TYPES.UserRepository)
        private readonly _userRepository: IUserRepository
    ) { }

    async execute(data: VerifyOtpDTO): Promise<BaseResponseDTO> {

        const redisKey = `forgot-password-otp:${data.email}`;
        const storedOtp = await redisClient.hgetall(redisKey);

        if (!storedOtp || !storedOtp.otp) {
            throw new ValidationError(ErrorMessage.OTP_EXPIRED);
        }

        if (Number(storedOtp.expiresAt) < Date.now()) {
            throw new ValidationError(ErrorMessage.OTP_EXPIRED);
        }

        if (storedOtp.otp !== data.otp) {
            throw new ValidationError(ErrorMessage.INVALID_OTP);
        }

        const user = await this._userRepository.findByField("email", data.email);
        if (!user) {
            throw new NotFoundError(ErrorMessage.USER_NOT_FOUND);
        }

        const resetToken = crypto.randomBytes(32).toString("hex");
        const hashedResetToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");


        await redisClient.setex(`reset-token:${resetToken}`, 300, hashedResetToken);
        await redisClient.del(redisKey);

        return {
            success: true,
            message: "OTP verified. You can now reset your password.",
            data: { resetToken },
            statusCode: HttpStatus.OK,
        };
    }
}
