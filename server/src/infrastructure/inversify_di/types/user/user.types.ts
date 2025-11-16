export const USER_TYPES = {
  // Repository
  IUserRepository: Symbol.for("IUserRepository"),

  //Usecases
  UserSignupUseCase: Symbol.for("UserSignupUseCase"),
  UserLoginUseCase: Symbol.for("UserLoginUseCase"),
  GetUserProfileUseCase: Symbol.for("GetUserProfileUseCase"),

  //Controller
  UserController: Symbol.for("UserController"),
};
