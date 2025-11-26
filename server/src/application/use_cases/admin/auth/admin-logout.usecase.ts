import { injectable } from "inversify"
import { redisClient } from "@infrastructure/providers/redis/redis.provider"
import type { IAdminLogoutUseCase } from "@application/use_cases/interfaces/admin/admin-logout.interface";

@injectable()
export class AdminLogoutUseCase implements IAdminLogoutUseCase {
    async execute(data: { id: string; adminCode?: string }): Promise<void> {
        await redisClient.del(`refresh_token:${data.id}`);
    }
}