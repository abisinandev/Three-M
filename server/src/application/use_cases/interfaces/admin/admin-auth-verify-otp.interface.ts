import { VerifyOtpResponseDTO } from "@application/dto/auth/verify-otp-response.dto";
import { VerifyOtpDTO } from "@application/dto/auth/verify-otp.dto";

export interface IAdminAuthVerifyOtpUseCase {
    execute(data: VerifyOtpDTO): Promise<VerifyOtpResponseDTO>;
}