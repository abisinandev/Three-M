import type { ResendOtpResponseDTO } from "@application/dto/auth/resend-otp-response.dto";
import type { ResendOtpDTO } from "@application/dto/auth/resend-otp.dto";

export interface ISignupResendOtpUseCase {
    execute(data: ResendOtpDTO): Promise<ResendOtpResponseDTO>
}