import type { OtpDTO } from "@application/dto/auth/send-otp.dto";
import { redisClient } from "./redis.provider";

export async function OtpStore(data: OtpDTO,ttl:number) {
    await redisClient.hset(`otp:${data.email}`, "email", data.email);
    await redisClient.hset(`otp:${data.email}`, "otp", data.otp);
    await redisClient.hset(`otp:${data.email}`, "expiresAt", data.expiresAt.toString());
    await redisClient.hset(`otp:${data.email}`, "resendCount", data.resendCount);
    await redisClient.hset(`otp:${data.email}`, "lastResendAt", data.lastResendAt.toString());
    await redisClient.expire(`otp:${data.email}`, ttl);
}