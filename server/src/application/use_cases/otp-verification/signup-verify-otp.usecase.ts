import type { VerifyOtpDTO } from "@application/dto/auth/verify-otp.dto";
import type { IUserRepository } from "@application/interfaces/repositories/user-repository.interface";
import { ErrorMessage } from "@domain/enum/express/messages/error.message";
import { SuccessMessage } from "@domain/enum/express/messages/success.message";
import { USER_TYPES } from "@infrastructure/inversify_di/types/user/user.types";
import { redisClient } from "@infrastructure/providers/redis/redis.provider";
import { NotFoundError, ValidationError } from "@presentation/express/utils/error-handling";
import { inject, injectable } from "inversify";
import type { IBaseUseCase } from "../interfaces/base-usecase.interface";
import type { BaseResponseDTO } from "@application/dto/auth/base-response.dto";
import { HttpStatus } from "@domain/enum/express/status-code";

@injectable()
export class SignupVerifyOtpUseCase implements IBaseUseCase<VerifyOtpDTO, BaseResponseDTO> {
    constructor(
        @inject(USER_TYPES.UserRepository) private readonly _userRepository: IUserRepository
    ) { }

    async execute(data: VerifyOtpDTO): Promise<BaseResponseDTO> {

        const storedOtp = await redisClient.hgetall(`otp:${data.email}`);

        if (!storedOtp || !storedOtp.otp)
            throw new ValidationError(ErrorMessage.OTP_EXPIRED);

        if (Number(storedOtp.expiresAt) < Date.now())
            throw new ValidationError(ErrorMessage.OTP_EXPIRED);

        if (storedOtp.otp !== data.otp)
            throw new ValidationError(ErrorMessage.INVALID_OTP);

        const user = await this._userRepository.verifyEmail(data.email);
        if (!user) throw new NotFoundError(ErrorMessage.USER_NOT_FOUND);

        await redisClient.del(data.email);

        return {
            success: true,
            message: SuccessMessage.EMAIL_VERIFIED,
            statusCode: HttpStatus.OK,
        }
    }
}