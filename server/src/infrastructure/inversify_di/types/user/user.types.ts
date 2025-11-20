export const USER_TYPES = {
  // Repository
  UserRepository: Symbol.for("UserRepository"),

  //Usecases
  UserSignupUseCase: Symbol.for("UserSignupUseCase"),
  UserLoginUseCase: Symbol.for("UserLoginUseCase"),
  GetUserProfileUseCase: Symbol.for("GetUserProfileUseCase"),
  ChangePasswordUseCase: Symbol.for("ChangePasswordUseCase"),

  //Controller
  UserController: Symbol.for("UserController"),
};
