import { inject, injectable } from "inversify";
import { IAdminProfileUseCase } from "../interfaces/admin/admin-profile-usecase.interface";
import { ADMIN_TYPES } from "@infrastructure/inversify_di/types/admin/admin.types";
import { IAdminRepository } from "@application/interfaces/repositories/admin.repository.interface";
import { AdminDTO } from "@application/dto/admin/admin-data.dto";

@injectable()
export class AdminProfileUseCase implements IAdminProfileUseCase {
    constructor(
        @inject(ADMIN_TYPES.AdminRepository) private readonly _adminRepository: IAdminRepository,
    ) { }
    async execute(data: { id: string }): Promise<AdminDTO> {

        const isAdmin = await this._adminRepository.findById(data.id as string);

        return {
            adminCode: isAdmin?.adminCode as string,
            fullName: isAdmin?.fullName as string,
            email: isAdmin?.fullName as string,
        }
    }
}
