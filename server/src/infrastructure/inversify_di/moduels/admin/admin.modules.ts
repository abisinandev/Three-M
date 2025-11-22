import { IAdminRepository } from "@application/interfaces/repositories/admin.repository.interface";
import { AdminAuthVerifyOtpUseCase } from "@application/use_cases/admin/admin-auth-verify-otp.usecase";
import { AdminAuthUseCase } from "@application/use_cases/admin/admin-auth.usecase";
import { AdminLogoutUseCase } from "@application/use_cases/admin/admin-logout.usecase";
import { AdminProfileUseCase } from "@application/use_cases/admin/admin-profile.usecase";
import { AdminRefreshTokenUseCase } from "@application/use_cases/admin/admin-refresh-token.usecase";
import { IAdminAuthUseCase } from "@application/use_cases/interfaces/admin/admin-auth-usecase.interface";
import { IAdminAuthVerifyOtpUseCase } from "@application/use_cases/interfaces/admin/admin-auth-verify-otp.interface";
import { IAdminLogoutUseCase } from "@application/use_cases/interfaces/admin/admin-logout.interface";
import { IAdminProfileUseCase } from "@application/use_cases/interfaces/admin/admin-profile-usecase.interface";
import { IRefreshTokenUseCase } from "@application/use_cases/interfaces/admin/admin-refresh-token.interface";
import { AdminRepository } from "@infrastructure/databases/repository/auth/admin.repository";
import { ADMIN_TYPES } from "@infrastructure/inversify_di/types/admin/admin.types";
import { AdminAuthController } from "@presentation/http/controllers/admin/admin-auth.controller";
import { AdminController } from "@presentation/http/controllers/admin/admin.controller";
import { ContainerModule } from "inversify";

export const AdminModule = new ContainerModule(({ bind }) => {
    //Usecases
    bind<IAdminAuthUseCase>(ADMIN_TYPES.AdminAuthUseCase).to(AdminAuthUseCase);
    bind<IAdminAuthVerifyOtpUseCase>(ADMIN_TYPES.AdminAuthVerifyOtpUseCase).to(AdminAuthVerifyOtpUseCase)
    bind<IRefreshTokenUseCase>(ADMIN_TYPES.AdminRefreshTokenUseCase).to(AdminRefreshTokenUseCase);
    bind<IAdminLogoutUseCase>(ADMIN_TYPES.AdminLogoutUseCase).to(AdminLogoutUseCase);
    bind<IAdminProfileUseCase>(ADMIN_TYPES.AdminProfileUseCase).to(AdminProfileUseCase);

    //Repository
    bind<IAdminRepository>(ADMIN_TYPES.AdminRepository).to(AdminRepository);

    bind<AdminAuthController>(ADMIN_TYPES.AdminAuthController).to(AdminAuthController);
    bind<AdminController>(ADMIN_TYPES.AdminController).to(AdminController);
})