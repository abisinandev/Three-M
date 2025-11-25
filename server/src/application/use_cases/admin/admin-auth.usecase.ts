import { inject, injectable } from "inversify";
import type { IAdminAuthUseCase } from "../interfaces/admin/admin-auth-usecase.interface";
import type { AdminAuthDTO } from "@application/dto/admin/admin-auth.dto";
import { ADMIN_TYPES } from "@infrastructure/inversify_di/types/admin/admin.types";
import type { IAdminRepository } from "@application/interfaces/repositories/admin.repository.interface";
import { NotFoundError, ValidationError } from "@presentation/express/utils/error-handling";
import { ErrorMessage } from "@domain/enum/express/messages/error.message";
import { AUTH_TYPES } from "@infrastructure/inversify_di/types/auth/auth.types";
import type { IPasswordHashingService } from "@application/interfaces/services/auth/password-hashing.service.interface";
import { generateOtp } from "@shared/utils/otp-generator";
import type { IEmailService } from "@application/interfaces/services/auth/email.service.interface";
import { redisClient } from "@infrastructure/providers/redis/redis.provider";
import type { AdminAuthReponseDTO } from "@application/dto/admin/admin-auth.response.dto";

@injectable()
export class AdminAuthUseCase implements IAdminAuthUseCase {

    constructor(
        @inject(ADMIN_TYPES.AdminRepository) private readonly _adminRepository: IAdminRepository,
        @inject(AUTH_TYPES.IPasswordHashingService) private readonly _passwordHashing: IPasswordHashingService,
        @inject(AUTH_TYPES.IEmailService) private readonly _emailVerifyService: IEmailService,
    ) { }

    async execute(data: AdminAuthDTO): Promise<AdminAuthReponseDTO> {

        const isExist = await this._adminRepository.findOne({ adminCode: data.adminCode });
        console.log('=========',isExist?.email)
        if (!isExist) throw new NotFoundError(ErrorMessage.ADMIN_NOT_FOUND);

        const isMatch = await this._passwordHashing.verify(data.password, isExist.password)
        if (!isMatch) throw new ValidationError(ErrorMessage.INVALID_PASSWORD);

        const otp = generateOtp();
        const expiryTime = 5 * 60;
        const expiresAt = Date.now() + expiryTime * 1000;
        const redisKey = `otp:${isExist.email}`;
        const resendCount = 0;
        const now = Date.now()

        await this._emailVerifyService.sendOtpEmail(isExist.email, otp);
        await redisClient.hmset(redisKey, {
            email: isExist.email,
            otp,
            expiresAt,
            resendCount,
            lastResendAt: now
        });
        await redisClient.expire(redisKey, 300);

        return { expiresAt, resendCount, email: isExist.email }
    }
}