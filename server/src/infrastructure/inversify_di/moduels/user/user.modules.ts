import type { IUserRepository } from "@application/interfaces/repositories/user-repository.interface";
import { UserLoginUseCase } from "@application/use_cases/auth/user-login.usecase";
import { UserSignupUseCase } from "@application/use_cases/auth/user-signup.usecase";
import { ContainerModule } from "inversify";
import { USER_TYPES } from "../../types/user/user.types";
import { UserRepository } from "@infrastructure/databases/repository/auth/user.repository";
import { UserController } from "@presentation/http/controllers/user/user.controller";
import { GetUserProfileUseCase } from "@application/use_cases/user/user-profile.usecase";
import { ChangePasswordUseCase } from "@application/use_cases/user/change-password.usecase";
import type { IUserSignupUseCase } from "@application/use_cases/interfaces/user/user-signup.usecase.interface";
import type { IUserLoginUseCase } from "@application/use_cases/interfaces/user/user-login-usecase.interface";
import type { IChangePasswordUseCase } from "@application/use_cases/interfaces/user/change-password.usecase.interface";
import type { IUserProfileInterface } from "@application/use_cases/interfaces/user/user-profile-usecase.interface";

export const UserModule = new ContainerModule(({ bind }) => {
  //Repository
  bind<IUserRepository>(USER_TYPES.UserRepository).to(UserRepository);

  //Controller
  bind<UserController>(USER_TYPES.UserController).to(UserController);

  //Usecases
  bind<IUserLoginUseCase>(USER_TYPES.UserLoginUseCase).to(UserLoginUseCase);
  bind<IUserSignupUseCase>(USER_TYPES.UserSignupUseCase).to(UserSignupUseCase);
  bind<IUserProfileInterface>(USER_TYPES.GetUserProfileUseCase).to(GetUserProfileUseCase)
  bind<IChangePasswordUseCase>(USER_TYPES.ChangePasswordUseCase).to(ChangePasswordUseCase)
});
