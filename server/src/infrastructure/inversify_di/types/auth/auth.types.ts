
export const AUTH_TYPES = {
  // Controllers
  OtpController: Symbol.for("OtpController"),
  AuthController: Symbol.for("AuthController"),

  // Interfaces
  IEmailService: Symbol.for("IEmailService"),
  IPasswordHashingService: Symbol.for("IPasswordHashingService"),
  IJwtProvider: Symbol.for('IJwtProvider'),

  // Use Cases
  VerifyOtpUseCase: Symbol.for("VerifyOtpUseCase"),
  ResendOtpUseCase: Symbol.for("ResendOtpUseCase"),
  RefreshTokenUseCase: Symbol.for("RefreshTokenUseCase"),
  LogoutUseCase: Symbol.for("LogoutUseCase"),

  //Providers
  TwoFactorAuthSetup: Symbol.for("TwoFactorAuthSetup"),
  TwoFactorAuthVerify: Symbol.for("TwoFactorAuthVerify"),
  VerifyTwoFactorUseCase: Symbol.for("VerifyTwoFactorUseCase"),
};
