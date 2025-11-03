import { OtpDTO } from "@application/dto/auth-dto/send-otp.dto";
import { IOtpRepository } from "@application/interfaces/repositories/otp-repository.interface";
import { redisClient } from "@infrastructure/providers/redis/redis.provider";

export class OtpRepository implements IOtpRepository {
  private readonly client = redisClient;
  private readonly otpPrefix = "otp:";

  async saveOtp(email: string, otp: string, ttl = 300): Promise<OtpDTO> {
    const key = this.otpPrefix + email;
    const expiresAt = Date.now() + ttl * 1000;

    const record: OtpDTO = {
      otp,
      email,
      expiresAt,
      resendCount: 0,
      lastResendAt: null
    };

    await this.client.hset(key, "email", email);
    await this.client.hset(key, "otp", otp);
    await this.client.hset(key, "expiresAt", expiresAt.toString());
    await this.client.hset(key, "resendCount", 0);
    await this.client.hset(key, "lastResendAt", Date.now().toString());
    await this.client.expire(key, ttl);

    return record;
  }

  async getOtp(email: string): Promise<OtpDTO | null> {
    const key = this.otpPrefix + email;
    const doc = await this.client.hgetall(key);
    return {
      otp: doc.otp,
      email: doc.email,
      expiresAt: Number(doc.expiresAt),
      resendCount: Number(doc.resendCount),
      lastResendAt: Number(doc.lastResendAt)
    };
  }

  async deleteOtp(email: string): Promise<void> {
    await this.client.del(`${this.otpPrefix}${email}`);
  }

  async updateResendInfo(email: string, otp: string): Promise<{ otp: string, expiresAt: number, resendCount: number }> {
    const key = this.otpPrefix + email;
    const ttl = 300;
    const expiresAt = Date.now() + ttl * 1000;
    await this.client.hset(key, "otp", otp);
    await this.client.hset(key, "expiresAt", expiresAt.toString());
    const resendCount = await this.client.hincrby(key, "resendCount", 1);
    await this.client.expire(key, ttl);
    

    return { otp, expiresAt, resendCount }
  }
}
