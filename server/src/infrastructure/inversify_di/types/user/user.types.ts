export const USER_TYPES = {
  // Repository
  UserRepository: Symbol.for("UserRepository"),

  //Usecases
  UserSignupUseCase: Symbol.for("UserSignupUseCase"),
  UserLoginUseCase: Symbol.for("UserLoginUseCase"),
  GetUserProfileUseCase: Symbol.for("GetUserProfileUseCase"),
  ChangePasswordUseCase: Symbol.for("ChangePasswordUseCase"),
  LogoutUseCase: Symbol.for("LogoutUseCase"),
  CheckUserBlockedUseCase: Symbol.for("CheckUserBlockedUseCase"),
  KycSubmitUseCase: Symbol.for("KycSubmitUseCase"),
  KycRepository: Symbol.for("KycRepository"),
  
  //providers
  SignatureUploadUseCase: Symbol.for("SignatureUploadUseCase"),
  CloudinaryStorageProvider: Symbol.for("CloudinaryStorageProvider"),

  //Controller
  UserController: Symbol.for("UserController"),


};
