import type { IAdminRepository } from "@application/interfaces/repositories/admin.repository.interface";
import { AdminAuthVerifyOtpUseCase } from "@application/use_cases/admin/auth/admin-auth-verify-otp.usecase";
import { AdminAuthUseCase } from "@application/use_cases/admin/auth/admin-auth.usecase";
import { AdminLogoutUseCase } from "@application/use_cases/admin/auth/admin-logout.usecase";
import { AdminProfileUseCase } from "@application/use_cases/admin/auth/admin-profile.usecase";
import { AdminRefreshTokenUseCase } from "@application/use_cases/admin/auth/admin-refresh-token.usecase";
import { AdminResendOtpUseCase } from "@application/use_cases/admin/auth/admin-resend-otp-usecase";
import { FetchAllKycDocsUseCase } from "@application/use_cases/admin/kyc-management/fetch-kyc-management.usecase";
import { RejectKycUseCase } from "@application/use_cases/admin/kyc-management/reject-kyc-usecase";
import { VerifyKycUseCase } from "@application/use_cases/admin/kyc-management/verify-kyc-usecase";
import { ViewKycDetailsUseCase } from "@application/use_cases/admin/kyc-management/view-kyc-details.usecase";
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
import { IFetchAllKycDocsUseCase } from "@application/use_cases/interfaces/admin/kyc-management-usecase.interface";
import { IRejectKycUseCase } from "@application/use_cases/interfaces/admin/reject-kyc-usecase.interface";
import { IUnblockUserUsecase } from "@application/use_cases/interfaces/admin/unblock-user-usecase.interface";
import { IVerifyKycUseCase } from "@application/use_cases/interfaces/admin/verify-kyc-usecase.interface";
import { IViewKycDetailsUseCase } from "@application/use_cases/interfaces/admin/view-kyc-details-usecase.interface";
import { AdminRepository } from "@infrastructure/databases/repository/auth/admin.repository";
import { ADMIN_TYPES } from "@infrastructure/inversify_di/types/admin/admin.types";
import { AdminAuthController } from "@presentation/http/controllers/admin/admin-auth.controller";
import { AdminKycController } from "@presentation/http/controllers/admin/admin-kyc.controller";
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
    bind<IFetchAllKycDocsUseCase>(ADMIN_TYPES.FetchAllKycDocsUseCase).to(FetchAllKycDocsUseCase);

    //Repository
    bind<IAdminRepository>(ADMIN_TYPES.AdminRepository).to(AdminRepository);

    bind<AdminAuthController>(ADMIN_TYPES.AdminAuthController).to(AdminAuthController);
    bind<AdminController>(ADMIN_TYPES.AdminController).to(AdminController);
    bind<AdminUserController>(ADMIN_TYPES.AdminUserController).to(AdminUserController);
    bind<AdminKycController>(ADMIN_TYPES.AdminKycController).to(AdminKycController);
    bind<IViewKycDetailsUseCase>(ADMIN_TYPES.ViewKycDetailsUseCase).to(ViewKycDetailsUseCase);
    bind<IVerifyKycUseCase>(ADMIN_TYPES.VerifyKycUseCase).to(VerifyKycUseCase);
    bind<IRejectKycUseCase>(ADMIN_TYPES.RejectKycUseCase).to(RejectKycUseCase);
})