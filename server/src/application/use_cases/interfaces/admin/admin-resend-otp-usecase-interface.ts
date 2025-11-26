import { ResendOtpResponseDTO } from "@application/dto/auth/resend-otp-response.dto";
import { ResendOtpDTO } from "@application/dto/auth/resend-otp.dto";

export interface IAdminResendOtpUseCase{
    execute(data:ResendOtpDTO):Promise<ResendOtpResponseDTO>
}