import type { CreateUserDTO } from "@application/dto/auth/create-user.dto";
import type { IUserRepository } from "@application/interfaces/repositories/user-repository.interface";
import type { IPasswordHashingService } from "@application/interfaces/services/auth/password-hashing.service.interface";
import { toEntity } from "@application/mappers/user/user.mapper";
import { ErrorMessage } from "@domain/enum/express/messages/error.message";
import { SuccessMessage } from "@domain/enum/express/messages/success.message";
import { AUTH_TYPES } from "@infrastructure/inversify_di/types/auth/auth.types";
import { USER_TYPES } from "@infrastructure/inversify_di/types/user/user.types";
import { ConflictError } from '@presentation/express/utils/error-handling/index'
import { inject, injectable } from "inversify";
import type { IBaseUseCase } from "../interfaces/base-usecase.interface";
import type { BaseResponseDTO } from "@application/dto/auth/base-response.dto";
import { HttpStatus } from "@domain/enum/express/status-code";
import { generateOtp } from "@shared/utils/otp-generator";
import type { IEmailService } from "@application/interfaces/services/auth/email.service.interface";
import { redisClient } from "@infrastructure/providers/redis/redis.provider";

@injectable()
export class UserSignupUseCase implements IBaseUseCase<CreateUserDTO, BaseResponseDTO> {

    constructor(
        @inject(USER_TYPES.UserRepository) private readonly _userRepository: IUserRepository,
        @inject(AUTH_TYPES.IPasswordHashingService) private readonly _passswordHashing: IPasswordHashingService,
        @inject(AUTH_TYPES.IEmailService) private readonly _emailVerifyService: IEmailService,

    ) { }

    async execute(user: CreateUserDTO): Promise<BaseResponseDTO> {

        const isExistingUser = await this._userRepository.findByField('email', user.email);
        const otp = generateOtp();
        const expiryTime = 5 * 60;
        const expiresAt = Date.now() + expiryTime * 1000;
        const redisKey = `otp:${user.email}`;
        const resendCount = 0;
        const now = Date.now()

        if (isExistingUser) {

            if (isExistingUser.isEmailVerified) {
                throw new ConflictError(ErrorMessage.EMAIL_ALREADY_EXISTS)
            }

            await this._emailVerifyService.sendOtpEmail(user.email, otp);
            await redisClient.hmset(redisKey, {
                email: user.email,
                otp,
                expiresAt,
                resendCount,
                lastResendAt: now
            });
            await redisClient.expire(redisKey, 300);

            return {
                success: true,
                message: SuccessMessage.ACCOUNT_EXISTS_EMAIL_NOT_VERIFIED,
                statusCode: HttpStatus.OK,
                data: { expiresAt }
            };
        }

        const isExistingPhone = await this._userRepository.findByField('phone', user.phone);
        if (isExistingPhone) {
            throw new ConflictError(ErrorMessage.PHONENO_ALREADY_EXISTS)
        }

        const hashedPassword = await this._passswordHashing.hash(user.password);
        const newUser = toEntity(user, hashedPassword);
        await this._userRepository.create(newUser);

        await this._emailVerifyService.sendOtpEmail(user.email, otp);
        await redisClient.hmset(redisKey, {
            email: user.email,
            otp,
            expiresAt,
            resendCount,
            lastResendAt: now
        });
        await redisClient.expire(redisKey, 300);

        return {
            success: true,
            message: SuccessMessage.OTP_SEND,
            statusCode: HttpStatus.CREATED,
            data: { expiresAt }
        };
    }
}

