import AppError from "@presentation/express/utils/errors/app.error";
import { inject, injectable } from "inversify";
import { IOtpRepository } from "@application/interfaces/repositories/otp-repository.interface";
import { IUserRepository } from "@application/interfaces/repositories/user-repository.interface";
import { VerifyOtpDTO } from "@application/dto/auth-dto/verify-otp.dto";
import { AUTH_TYPES } from "@infrastructure/inversify_di/types/auth/auth.types";
import { USER_TYPES } from "@infrastructure/inversify_di/types/user/user.types";

@injectable()
export class VerifyOtpUseCase {
    constructor(
        @inject(AUTH_TYPES.IOtpRepository) private readonly _otpRepository: IOtpRepository,
        @inject(USER_TYPES.IUserRepository) private readonly _userRepository: IUserRepository
    ) { }

    async execute(data: VerifyOtpDTO) {
        
        const storedOtp = await this._otpRepository.getOtp(data.email)
        
        if (!storedOtp) throw new AppError('OTP expired or not found', 400);
        if (storedOtp.otp !== data.otp) throw new AppError('Invalid OTP', 400);

        await this._otpRepository.deleteOtp(data.email);

        const user = await this._userRepository.verifyEmail(data.email);
        if (!user) throw new AppError('User not found', 404);

        return { success: true, message: "Email verified successfully" }
    }
}