import { OtpDTO } from "@application/dto/auth-dto/send-otp.dto";

type VerificationType = {
  email: string;
};
export interface IVerificationService {
  sendVerification(data: string): Promise<OtpDTO | { otp: string, expiresAt: number,resendCount:number }>;
}
