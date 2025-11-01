import { OtpDTO } from "@application/dto/auth-dto/send-otp.dto";
import { IVerificationService } from "@application/interfaces/services/user-verfication.service.interface";
import { GenerateOtpUseCase } from "@application/use_cases/auth/generate-otp.usecase";
import { AUTH_TYPES } from "@infrastructure/inversify_di/types/auth/auth.types";
import { inject, injectable } from "inversify";

@injectable()
export class VerificationService implements IVerificationService {

    // Genereate otp interface setup neeeded 📌📌
    constructor(
        @inject(AUTH_TYPES.GenerateOtpUseCase) private readonly generateOtp: GenerateOtpUseCase
    ) { }

    async sendVerification(email: string): Promise<OtpDTO | { otp: string, expiresAt: number, resendCount: number }> {
        return await this.generateOtp.execute(email)
    }
}