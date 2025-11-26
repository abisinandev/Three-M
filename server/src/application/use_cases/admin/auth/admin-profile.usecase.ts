import { inject, injectable } from "inversify";
import { ADMIN_TYPES } from "@infrastructure/inversify_di/types/admin/admin.types";
import type { IAdminRepository } from "@application/interfaces/repositories/admin.repository.interface";
import type { AdminDTO } from "@application/dto/admin/admin-data.dto";
import type { IAdminProfileUseCase } from "@application/use_cases/interfaces/admin/admin-profile-usecase.interface";

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
