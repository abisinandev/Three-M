import { injectable } from "inversify";
import { BaseRepository } from "../base.repository";
import type { AdminEntity } from "@domain/entities/admin.entity";
import {
    type AdminDocument,
    AdminModel
} from "@infrastructure/databases/mongo_db/models/schemas/admin.schema";
import type { IAdminRepository } from "@application/interfaces/repositories/admin.repository.interface";
import { AdminMapper } from "@infrastructure/mappers/admin.mapper";

@injectable()
export class AdminRepository extends BaseRepository<AdminEntity, AdminDocument> implements IAdminRepository {
    constructor() {
        super(AdminModel, AdminMapper);
    }

}