import { injectable } from "inversify";
import type { IBaseUseCase } from "../interfaces/base-usecase.interface";
import { redisClient } from "@infrastructure/providers/redis/redis.provider";
import type { BaseResponseDTO } from "@application/dto/auth/base-response.dto";
import { HttpStatus } from "@domain/enum/express/status-code";

@injectable()
export class LogoutUseCase implements IBaseUseCase<{ userId: string }, BaseResponseDTO> {

    async execute(req: { userId: string }): Promise<BaseResponseDTO> {
        await redisClient.del(`refresh_token:${req.userId}`)
        return {
            success: true,
            message: "Token deleted from database",
            statusCode: HttpStatus.OK,
        }
    }

}