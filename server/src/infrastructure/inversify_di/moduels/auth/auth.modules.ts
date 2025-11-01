import { ContainerModule } from "inversify";
import { AUTH_TYPES } from "@infrastructure/inversify_di/types/auth/auth.types";
import { OtpController } from "@presentation/http/controllers/auth/otp.controller";
import { GenerateOtpUseCase } from "@application/use_cases/auth/generate-otp.usecase";
import { VerifyOtpUseCase } from "@application/use_cases/otp-verification/verify-otp.usecase";
import { ResendOtpUseCase } from "@application/use_cases/otp-verification/resend-otp.usecase";
import { IOtpRepository } from "@application/interfaces/repositories/otp-repository.interface";
import { IEmailService } from "@application/interfaces/services/email.service.interface";
import { IPasswordHashingService } from "@application/interfaces/services/password-hashing.service.interface";
import { OtpRepository } from "@infrastructure/databases/repository/otp.repository";
import { NodeMailerService } from "@infrastructure/providers/email/nodemailor.provider";
import { PasswordHashingService } from "@infrastructure/providers/hashing/password-hashing.provider";

export const AuthModule = new ContainerModule(({ bind }) => {
  bind<IOtpRepository>(AUTH_TYPES.IOtpRepository).to(OtpRepository);
  bind<IEmailService>(AUTH_TYPES.IEmailService).to(NodeMailerService);
  bind<IPasswordHashingService>(AUTH_TYPES.IPasswordHashingService).to(
    PasswordHashingService,
  );
  bind<GenerateOtpUseCase>(AUTH_TYPES.GenerateOtpUseCase).to(
    GenerateOtpUseCase,
  );
  bind<VerifyOtpUseCase>(AUTH_TYPES.VerifyOtpUseCase).to(VerifyOtpUseCase);
  bind<ResendOtpUseCase>(AUTH_TYPES.ResendOtpUseCase).to(ResendOtpUseCase);
  bind<OtpController>(AUTH_TYPES.OtpController).to(OtpController);
});
