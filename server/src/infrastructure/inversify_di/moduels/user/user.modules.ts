import { Container, ContainerModule } from "inversify";
import { USER_TYPES } from "../../types/user/user.types";
import { IUserRepository } from "@application/interfaces/repositories/user-repository.interface";
import { UserRepository } from "@infrastructure/databases/repository/user.repository";
import { UserSignupUseCase } from "@application/use_cases/auth/user-signup.usecase";
import { UserAuthController } from "@presentation/http/controllers/user/user-auth.controller";
import { IVerificationService } from "@application/interfaces/services/user-verfication.service.interface";
import { VerificationService } from "@application/service/user-verification-service";
import { AUTH_TYPES } from "@infrastructure/inversify_di/types/auth/auth.types";

export const UserModule = new ContainerModule(({ bind }) => {
  bind<UserSignupUseCase>(USER_TYPES.UserSignupUseCase).to(UserSignupUseCase);
  bind<UserAuthController>(USER_TYPES.UserAuthController).to(
    UserAuthController,
  );
  bind<IVerificationService>(AUTH_TYPES.IVerificationService).to(
    VerificationService,
  );
  bind<IUserRepository>(USER_TYPES.IUserRepository).to(UserRepository);
});
