import type { IAdminRepository } from "@application/interfaces/repositories/admin.repository.interface";
import { AdminAuthVerifyOtpUseCase } from "@application/use_cases/admin/auth/admin-auth-verify-otp.usecase";
import { AdminAuthUseCase } from "@application/use_cases/admin/auth/admin-auth.usecase";
import { AdminLogoutUseCase } from "@application/use_cases/admin/auth/admin-logout.usecase";
import { AdminProfileUseCase } from "@application/use_cases/admin/auth/admin-profile.usecase";
import { AdminRefreshTokenUseCase } from "@application/use_cases/admin/auth/admin-refresh-token.usecase";
import { AdminResendOtpUseCase } from "@application/use_cases/admin/auth/admin-resend-otp-usecase";
import { BlockUserUseCase } from "@application/use_cases/admin/user-management/block-user.usecase";
import { FetchUserDetails } from "@application/use_cases/admin/user-management/fetch-user-details.usecase";
import { UnblockUserUsecase } from "@application/use_cases/admin/user-management/unblock-user.usecase";
import type { IAdminAuthUseCase } from "@application/use_cases/interfaces/admin/admin-auth-usecase.interface";
import type { IAdminAuthVerifyOtpUseCase } from "@application/use_cases/interfaces/admin/admin-auth-verify-otp.interface";
import type { IAdminLogoutUseCase } from "@application/use_cases/interfaces/admin/admin-logout.interface";
import type { IAdminProfileUseCase } from "@application/use_cases/interfaces/admin/admin-profile-usecase.interface";
import type { IRefreshTokenUseCase } from "@application/use_cases/interfaces/admin/admin-refresh-token.interface";
import { IAdminResendOtpUseCase } from "@application/use_cases/interfaces/admin/admin-resend-otp-usecase-interface";
import { IBlockUserUseCase } from "@application/use_cases/interfaces/admin/block-user-usecase.interface";
import { IFetchUserDetails } from "@application/use_cases/interfaces/admin/fetch-user-details";
import { IUnblockUserUsecase } from "@application/use_cases/interfaces/admin/unblock-user-usecase.interface";
import { AdminRepository } from "@infrastructure/databases/repository/auth/admin.repository";
import { ADMIN_TYPES } from "@infrastructure/inversify_di/types/admin/admin.types";
import { AdminAuthController } from "@presentation/http/controllers/admin/admin-auth.controller";
import { AdminUserController } from "@presentation/http/controllers/admin/admin-user.controller";
import { AdminController } from "@presentation/http/controllers/admin/admin.controller";
import { ContainerModule } from "inversify";

export const AdminModule = new ContainerModule(({ bind }) => {
    //Usecases
    bind<IAdminAuthUseCase>(ADMIN_TYPES.AdminAuthUseCase).to(AdminAuthUseCase);
    bind<IAdminAuthVerifyOtpUseCase>(ADMIN_TYPES.AdminAuthVerifyOtpUseCase).to(AdminAuthVerifyOtpUseCase)
    bind<IRefreshTokenUseCase>(ADMIN_TYPES.AdminRefreshTokenUseCase).to(AdminRefreshTokenUseCase);
    bind<IAdminLogoutUseCase>(ADMIN_TYPES.AdminLogoutUseCase).to(AdminLogoutUseCase);
    bind<IAdminProfileUseCase>(ADMIN_TYPES.AdminProfileUseCase).to(AdminProfileUseCase);
    bind<IAdminResendOtpUseCase>(ADMIN_TYPES.AdminResendOtpUseCase).to(AdminResendOtpUseCase);
    bind<IFetchUserDetails>(ADMIN_TYPES.FetchUserDetails).to(FetchUserDetails);
    bind<IBlockUserUseCase>(ADMIN_TYPES.BlockUserUseCase).to(BlockUserUseCase);
    bind<IUnblockUserUsecase>(ADMIN_TYPES.UnblockUserUsecase).to(UnblockUserUsecase);

    //Repository
    bind<IAdminRepository>(ADMIN_TYPES.AdminRepository).to(AdminRepository);

    bind<AdminAuthController>(ADMIN_TYPES.AdminAuthController).to(AdminAuthController);
    bind<AdminController>(ADMIN_TYPES.AdminController).to(AdminController);
    bind<AdminUserController>(ADMIN_TYPES.AdminUserController).to(AdminUserController);
})