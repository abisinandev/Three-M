import { inject, injectable } from "inversify";
import { IOtpRepository } from "@application/interfaces/repositories/otp-repository.interface";
import { IUserRepository } from "@application/interfaces/repositories/user-repository.interface";
import { VerifyOtpDTO } from "@application/dto/auth-dto/verify-otp.dto";
import { AUTH_TYPES } from "@infrastructure/inversify_di/types/auth/auth.types";
import { USER_TYPES } from "@infrastructure/inversify_di/types/user/user.types";
import { ErrorMessage } from "@domain/enum/express/messages/error.message";
import { NotFoundError, ValidationError } from "@presentation/express/utils/error-handling";
import { SuccessMessage } from "@domain/enum/express/messages/success.message";

@injectable()
export class VerifyOtpUseCase {
    constructor(
        @inject(AUTH_TYPES.IOtpRepository) private readonly _otpRepository: IOtpRepository,
        @inject(USER_TYPES.IUserRepository) private readonly _userRepository: IUserRepository
    ) { }

    async execute(data: VerifyOtpDTO) {
        
        const storedOtp = await this._otpRepository.getOtp(data.email)
        
        if (!storedOtp) throw new ValidationError(ErrorMessage.OTP_EXPIRED);
        if (storedOtp.otp !== data.otp) throw new ValidationError(ErrorMessage.INVALID_OTP);

        await this._otpRepository.deleteOtp(data.email);

        const user = await this._userRepository.verifyEmail(data.email);
        if (!user) throw new NotFoundError(ErrorMessage.USER_NOT_FOUND);

        return { success: true, message: SuccessMessage.EMAIL_VERIFIED }
    }
}