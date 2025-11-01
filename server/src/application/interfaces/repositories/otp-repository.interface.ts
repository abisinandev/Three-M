import { OtpDTO } from "@application/dto/auth-dto/send-otp.dto";

export interface IOtpRepository {
  saveOtp(email: string, otp: string, ttl: number): Promise<OtpDTO>;

  getOtp(email: string): Promise<OtpDTO | null>;

  deleteOtp(email: string): Promise<void>;

  updateResendInfo(email: string, otp: string): Promise<{ otp: string, expiresAt: number, resendCount: number }>;
}
