import type { IUserRepository } from "@application/interfaces/repositories/user-repository.interface";
import { UserLoginUseCase } from "@application/use_cases/auth/user-login.usecase";
import { UserSignupUseCase } from "@application/use_cases/auth/user-signup.usecase";
import { ContainerModule } from "inversify";
import { USER_TYPES } from "../../types/user/user.types";
import { UserRepository } from "@infrastructure/databases/repository/auth/user.repository";
import { UserController } from "@presentation/http/controllers/user/user.controller";
import { GetUserProfileUseCase } from "@application/use_cases/user/user-profile.usecase";
import type { IBaseUseCase } from "@application/use_cases/interfaces/base-usecase.interface";
import type { BaseResponseDTO } from "@application/dto/auth/base-response.dto";
import type { UserLoginDTO } from "@application/dto/auth/user-login.dto";
import type { CreateUserDTO } from "@application/dto/auth/create-user.dto";
import type { ResponseUserDTO } from "@application/dto/auth/response-user.dto";
import type { ChangePasswordDTO } from "@application/dto/user/change-password.dto";
import { ChangePasswordUseCase } from "@application/use_cases/user/change-password.usecase";

export const UserModule = new ContainerModule(({ bind }) => {
  //Repository
  bind<IUserRepository>(USER_TYPES.UserRepository).to(UserRepository);

  //Controller
  bind<UserController>(USER_TYPES.UserController).to(UserController);

  //Usecases
  bind<IBaseUseCase<UserLoginDTO, BaseResponseDTO>>(USER_TYPES.UserLoginUseCase).to(UserLoginUseCase);
  bind<IBaseUseCase<CreateUserDTO, BaseResponseDTO>>(USER_TYPES.UserSignupUseCase).to(UserSignupUseCase);
  bind<IBaseUseCase<{ userId: string }, BaseResponseDTO<ResponseUserDTO>>>(USER_TYPES.GetUserProfileUseCase).to(GetUserProfileUseCase)
  bind<IBaseUseCase<{userId:string,data:ChangePasswordDTO},BaseResponseDTO>>(USER_TYPES.ChangePasswordUseCase).to(ChangePasswordUseCase)
});
