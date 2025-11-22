import { injectable } from "inversify"
import { IAdminLogoutUseCase } from "../interfaces/admin/admin-logout.interface"
import { redisClient } from "@infrastructure/providers/redis/redis.provider"
import { ADMIN_TYPES } from "@infrastructure/inversify_di/types/admin/admin.types"

@injectable()
export class AdminLogoutUseCase implements IAdminLogoutUseCase {
    async execute(data: { id: string; adminCode?: string }): Promise<void> {
        await redisClient.del(`refresh_token:${data.id}`);
    }
}