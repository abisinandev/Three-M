import type { IEmailService } from "@application/interfaces/services/auth/email.service.interface";
import type { IPasswordHashingService } from "@application/interfaces/services/auth/password-hashing.service.interface";
import { ResendOtpUseCase } from "@application/use_cases/otp-verification/signup-resend-otp.usecase";
import { SignupVerifyOtpUseCase } from "@application/use_cases/otp-verification/signup-verify-otp.usecase";
import { AUTH_TYPES } from "@infrastructure/inversify_di/types/auth/auth.types";
import { NodeMailerService } from "@infrastructure/providers/email/nodemailor.provider";
import { PasswordHashingService } from "@infrastructure/providers/hashing/password-hashing.provider";
import { ContainerModule } from "inversify";
import type { IJwtProvider } from "@application/interfaces/services/auth/jwt.provider.interface";
import { JwtProvider } from "@infrastructure/providers/jwt/jwt.provider";
import { RefreshTokenUseCase } from "@application/use_cases/auth/refresh-token.usecase";
import { LogoutUseCase } from "@application/use_cases/auth/user-logout.usecase";
import { AuthController } from "@presentation/http/controllers/auth/auth.controller";
import { TwoFactorAuthSetup } from "@infrastructure/providers/2fa-security/2fa-auth-setup.provider";
import type { ITwoFactorAuthSetup } from "@application/interfaces/services/auth/2fa-auth-setup.interface";
import type { ITwoFactorAuthVerify } from "@application/interfaces/services/auth/2fa-auth-verify.interface";
import { TwoFactorAuthVerify } from "@infrastructure/providers/2fa-security/2fa-auth-verify.provider";
import { VerifyTwoFactorUseCase } from "@application/use_cases/auth/verify-2fa.usecase";
import { ForgotPasswordUseCase } from "@application/use_cases/auth/forgot-password.usecase";
import { ForgotPasswordOtpVerifyUseCase } from "@application/use_cases/otp-verification/forgot-pass-otp-verify.usecase";
import { ForgotPasswordResendOtpUseCase } from "@application/use_cases/otp-verification/forgot-pass-otp-resend.usecase";
import { ResetPasswordUseCase } from "@application/use_cases/auth/reset-password.usecase";
import type { IVerifyTwoFactorUseCase } from "@application/use_cases/interfaces/user/verify-2fa-usecase.interface";
import type { IForgotPasswordUseCase } from "@application/use_cases/interfaces/user/forgot-password-usecase.interface";
import type { ISignupVerifyOtpUseCase } from "@application/use_cases/interfaces/user/signup-verify-otp-usecase.interface";
import type { ISignupResendOtpUseCase } from "@application/use_cases/interfaces/user/singup-resend-otp-usecase.interface";
import type { IRefreshTokenUseCase } from "@application/use_cases/interfaces/user/refresh-token-usecase.interface";
import type { IForgotPasswordVerifyOtpUseCase } from "@application/use_cases/interfaces/user/forgot-pass-verify-otp-usecase.interface";
import type { IForgotPasswordResendOtpUseCase } from "@application/use_cases/interfaces/user/forgot-pass-resend-otp-usecase.interface";
import type { IResetPasswordUseCase } from "@application/use_cases/interfaces/user/reset-password-usecase.interface";
import type { IUserLogoutUseCase } from "@application/use_cases/interfaces/user/user-logout-usecase.interface";

export const AuthModule = new ContainerModule(({ bind }) => {
  //Providers
  bind<IEmailService>(AUTH_TYPES.IEmailService).to(NodeMailerService);
  bind<IPasswordHashingService>(AUTH_TYPES.IPasswordHashingService).to(PasswordHashingService);
  bind<IJwtProvider>(AUTH_TYPES.IJwtProvider).to(JwtProvider);
  bind<ITwoFactorAuthSetup>(AUTH_TYPES.TwoFactorAuthSetup).to(TwoFactorAuthSetup);
  bind<ITwoFactorAuthVerify>(AUTH_TYPES.TwoFactorAuthVerify).to(TwoFactorAuthVerify);

  //Usecases
  bind<ISignupVerifyOtpUseCase>(AUTH_TYPES.SignupVerifyOtpUseCase).to(SignupVerifyOtpUseCase);
  bind<ISignupResendOtpUseCase>(AUTH_TYPES.ResendOtpUseCase).to(ResendOtpUseCase);
  bind<IVerifyTwoFactorUseCase>(AUTH_TYPES.VerifyTwoFactorUseCase).to(VerifyTwoFactorUseCase);
  bind<IRefreshTokenUseCase>(AUTH_TYPES.RefreshTokenUseCase).to(RefreshTokenUseCase);
  bind<IUserLogoutUseCase>(AUTH_TYPES.LogoutUseCase).to(LogoutUseCase);
  bind<IForgotPasswordUseCase>(AUTH_TYPES.ForgotPasswordUseCase).to(ForgotPasswordUseCase);
  bind<IForgotPasswordVerifyOtpUseCase>(AUTH_TYPES.ForgotPasswordOtpVerifyUseCase).to(ForgotPasswordOtpVerifyUseCase);
  bind<IForgotPasswordResendOtpUseCase>(AUTH_TYPES.ForgotPasswordResendOtpUseCase).to(ForgotPasswordResendOtpUseCase);
  bind<IResetPasswordUseCase>(AUTH_TYPES.ResetPasswordUseCase).to(ResetPasswordUseCase);

  //Controllers
  bind<AuthController>(AUTH_TYPES.AuthController).to(AuthController);
});
