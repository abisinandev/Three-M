export const AUTH_TYPES = {
  // Controllers
  OtpController: Symbol.for("OtpController"),

  // Interfaces
  IOtpRepository: Symbol.for("IOtpRepository"),
  IEmailService: Symbol.for("IEmailService"),
  IPasswordHashingService: Symbol.for("IPasswordHashingService"),
  IVerificationService: Symbol.for("IVerificationService"),

  // Use Cases
  VerifyOtpUseCase: Symbol.for("VerifyOtpUseCase"),
  GenerateOtpUseCase: Symbol.for("GenerateOtpUseCase"),
  ResendOtpUseCase: Symbol.for("ResendOtpUseCase"),
};
