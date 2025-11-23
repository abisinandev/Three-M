import { injectable } from "inversify"
import type { IAdminLogoutUseCase } from "../interfaces/admin/admin-logout.interface"
import { redisClient } from "@infrastructure/providers/redis/redis.provider"

@injectable()
export class AdminLogoutUseCase implements IAdminLogoutUseCase {
    async execute(data: { id: string; adminCode?: string }): Promise<void> {
        await redisClient.del(`refresh_token:${data.id}`);
    }
}