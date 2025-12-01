import type { IUserRepository } from "@application/interfaces/repositories/user-repository.interface";
import { UserLoginUseCase } from "@application/use_cases/auth/user-login.usecase";
import { UserSignupUseCase } from "@application/use_cases/auth/user-signup.usecase";
import { ContainerModule } from "inversify";
import { USER_TYPES } from "../../types/user/user.types";
import { UserController } from "@presentation/http/controllers/user/user.controller";
import { GetUserProfileUseCase } from "@application/use_cases/user/user-profile.usecase";
import { ChangePasswordUseCase } from "@application/use_cases/user/change-password.usecase";
import type { IUserSignupUseCase } from "@application/use_cases/interfaces/user/user-signup.usecase.interface";
import type { IUserLoginUseCase } from "@application/use_cases/interfaces/user/user-login-usecase.interface";
import type { IChangePasswordUseCase } from "@application/use_cases/interfaces/user/change-password.usecase.interface";
import type { IUserProfileInterface } from "@application/use_cases/interfaces/user/user-profile-usecase.interface";
import type { IUserLogoutUseCase } from "@application/use_cases/interfaces/user/user-logout-usecase.interface";
import { LogoutUseCase } from "@application/use_cases/auth/user-logout.usecase";
import { CheckUserBlockedUseCase } from "@application/use_cases/user/check-user-blocked.usecase";
import { ICheckUserBlockedUseCase } from "@application/use_cases/interfaces/user/check-user-blocked-usecase.interface";
import { ISignatureUploadUseCase } from "@application/use_cases/interfaces/user/signature-upload-usecase.interface";
import { SignatureUploadUseCase } from "@application/use_cases/user/signature-upload.usecase";
import { IStorageProvider } from "@application/interfaces/services/externals/storage-provider.interface";
import { CloudinaryStorageProvider } from "@infrastructure/providers/storage-providers/cloudinary.provider";
import { IKycSubmitUseCase } from "@application/use_cases/interfaces/user/kyc-submit-usecase.interface";
import { KycSubmitUseCase } from "@application/use_cases/user/kyc-submit.usecase";
import { IKycRepository } from "@application/interfaces/repositories/kyc-repository.interface";
import { KycRepository } from "@infrastructure/databases/repository/auth/kyc-repository";
import { UserRepository } from "@infrastructure/databases/repository/auth/user.repository";

export const UserModule = new ContainerModule(({ bind }) => {
  //Repository
  bind<IUserRepository>(USER_TYPES.UserRepository).to(UserRepository);

  //Controller
  bind<UserController>(USER_TYPES.UserController).to(UserController);

  //Usecases
  bind<IUserLoginUseCase>(USER_TYPES.UserLoginUseCase).to(UserLoginUseCase);
  bind<IUserSignupUseCase>(USER_TYPES.UserSignupUseCase).to(UserSignupUseCase);
  bind<IUserProfileInterface>(USER_TYPES.GetUserProfileUseCase).to(GetUserProfileUseCase);
  bind<IChangePasswordUseCase>(USER_TYPES.ChangePasswordUseCase).to(ChangePasswordUseCase);
  bind<IUserLogoutUseCase>(USER_TYPES.LogoutUseCase).to(LogoutUseCase);
  bind<ICheckUserBlockedUseCase>(USER_TYPES.CheckUserBlockedUseCase).to(CheckUserBlockedUseCase);

  bind<ISignatureUploadUseCase>(USER_TYPES.SignatureUploadUseCase).to(SignatureUploadUseCase);
  bind<IStorageProvider>(USER_TYPES.CloudinaryStorageProvider).to(CloudinaryStorageProvider);
  bind<IKycSubmitUseCase>(USER_TYPES.KycSubmitUseCase).to(KycSubmitUseCase);
  bind<IKycRepository>(USER_TYPES.KycRepository).to(KycRepository);
});
