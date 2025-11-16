import type { IEmailService } from "@application/interfaces/services/auth/email.service.interface";
import type { IPasswordHashingService } from "@application/interfaces/services/auth/password-hashing.service.interface";
import { ResendOtpUseCase } from "@application/use_cases/otp-verification/resend-otp.usecase";
import { VerifyOtpUseCase } from "@application/use_cases/otp-verification/verify-otp.usecase";
import { AUTH_TYPES } from "@infrastructure/inversify_di/types/auth/auth.types";
import { NodeMailerService } from "@infrastructure/providers/email/nodemailor.provider";
import { PasswordHashingService } from "@infrastructure/providers/hashing/password-hashing.provider";
import { OtpController } from "@presentation/http/controllers/auth/otp.controller";
import { ContainerModule } from "inversify";
import type { IJwtProvider } from "@application/interfaces/services/auth/jwt.provider.interface";
import { JwtProvider } from "@infrastructure/providers/jwt/jwt.provider";
import type { IBaseUseCase } from "@application/use_cases/interfaces/base-usecase.interface";
import type { RefreshDTO } from "@application/dto/auth/refresh.dto";
import type { RefreshResponseDTO } from "@application/dto/auth/refresh-response.dto";
import { RefreshTokenUseCase } from "@application/use_cases/auth/refresh-token.usecase";
import { LogoutUseCase } from "@application/use_cases/auth/user-logout.usecase";
import { AuthController } from "@presentation/http/controllers/auth/auth.controller";
import { TwoFactorAuthSetup } from "@infrastructure/providers/2fa-security/2fa-auth-setup.provider";
import type { ITwoFactorAuthSetup } from "@application/interfaces/services/auth/2fa-auth-setup.interface";
import type { ITwoFactorAuthVerify } from "@application/interfaces/services/auth/2fa-auth-verify.interface";
import { TwoFactorAuthVerify } from "@infrastructure/providers/2fa-security/2fa-auth-verify.provider";
import type { Verify2faDTO } from "@application/dto/auth/2fa-verify-dto";
import type { VerifyOtpDTO } from "@application/dto/auth/verify-otp.dto";
import type { BaseResponseDTO } from "@application/dto/auth/base-response.dto";
import { VerifyTwoFactorUseCase } from "@application/use_cases/auth/verify-2fa.usecase";

export const AuthModule = new ContainerModule(({ bind }) => {
  //Providers
  bind<IEmailService>(AUTH_TYPES.IEmailService).to(NodeMailerService);
  bind<IPasswordHashingService>(AUTH_TYPES.IPasswordHashingService).to(PasswordHashingService);
  bind<IJwtProvider>(AUTH_TYPES.IJwtProvider).to(JwtProvider);
  bind<ITwoFactorAuthSetup>(AUTH_TYPES.TwoFactorAuthSetup).to(TwoFactorAuthSetup);
  bind<ITwoFactorAuthVerify>(AUTH_TYPES.TwoFactorAuthVerify).to(TwoFactorAuthVerify);

  //Usecases
  bind<IBaseUseCase<VerifyOtpDTO, BaseResponseDTO>>(AUTH_TYPES.VerifyOtpUseCase).to(VerifyOtpUseCase);
  bind<IBaseUseCase<{ email: string }, BaseResponseDTO<{ expiresAt: number, resendCount: number }>>>(AUTH_TYPES.ResendOtpUseCase).to(ResendOtpUseCase);
  bind<IBaseUseCase<Verify2faDTO, { accessToken: string, refreshToken: string }>>(AUTH_TYPES.VerifyTwoFactorUseCase).to(VerifyTwoFactorUseCase);
  bind<IBaseUseCase<RefreshDTO, RefreshResponseDTO>>(AUTH_TYPES.RefreshTokenUseCase).to(RefreshTokenUseCase);
  bind<IBaseUseCase<{ userId: string }, BaseResponseDTO>>(AUTH_TYPES.LogoutUseCase).to(LogoutUseCase);

  //Controllers
  bind<OtpController>(AUTH_TYPES.OtpController).to(OtpController);
  bind<AuthController>(AUTH_TYPES.AuthController).to(AuthController);
});
