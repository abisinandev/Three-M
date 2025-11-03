import AppError from "@presentation/express/utils/error-handling/app.error";
import { inject, injectable } from "inversify";
import { IUserRepository } from "@application/interfaces/repositories/user-repository.interface";
import { IVerificationService } from "@application/interfaces/services/user-verfication.service.interface";
import { USER_TYPES } from "@infrastructure/inversify_di/types/user/user.types";
import { AUTH_TYPES } from "@infrastructure/inversify_di/types/auth/auth.types";
import { IOtpRepository } from "@application/interfaces/repositories/otp-repository.interface";


@injectable()
export class ResendOtpUseCase {
    constructor(
        @inject(AUTH_TYPES.IVerificationService) private readonly _userVerification: IVerificationService,
        @inject(USER_TYPES.IUserRepository) private readonly _userRepository: IUserRepository,
        @inject(AUTH_TYPES.IOtpRepository) private readonly _otpRepository: IOtpRepository
    ) { }
    async execute(email: string) {

        const user = await this._userRepository.findByField('email', email);
        if (!user) throw new AppError('User not found', 404);
        if (user.isEmailVerified) throw new AppError('Email already verified', 400);

        const otpData = await this._otpRepository.getOtp(email);

        if (otpData) {
            const now = Date.now();

            if (otpData.lastResendAt && now - otpData.lastResendAt < 30000) {
                throw new AppError('Please wait before requesting another OTP', 429);
            }

            if (otpData.resendCount >= 4) {
                throw new AppError('Maximum resend attempts reached', 429);
            }
        }

        const newOtp = await this._userVerification.sendVerification(email);
        return {
            success: true,
            message: 'New OTP sent to your email.',
            expiresAt: newOtp?.expiresAt,
            resendCount: newOtp.resendCount
        };
    }
}