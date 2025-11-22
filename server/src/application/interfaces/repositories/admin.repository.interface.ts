import type { AdminEntity } from "@domain/entities/admin.entity";
import type { IBaseRepository } from "./base-repository.interface";

export interface IAdminRepository extends IBaseRepository<AdminEntity> {
    
}