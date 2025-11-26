export const ADMIN_TYPES = {
    //REPOSITORY
    AdminRepository: Symbol.for("AdminRepository"),

    //USECASES
    AdminAuthUseCase: Symbol.for("AdminAuthUseCase"),
    AdminAuthVerifyOtpUseCase: Symbol.for("AdminAuthVerifyOtpUseCase"),
    AdminRefreshTokenUseCase: Symbol.for('AdminRefreshTokenUseCase'),
    AdminLogoutUseCase: Symbol.for('AdminLogoutUseCase'),
    AdminProfileUseCase: Symbol.for('AdminProfileUseCase'),
    AdminResendOtpUseCase: Symbol.for("AdminResendOtpUseCase"),
    FetchUserDetails: Symbol.for("FetchUserDetails"),
    BlockUserUseCase: Symbol.for('BlockUserUseCase'),
    UnblockUserUsecase: Symbol.for('UnblockUserUsecase'),


    AdminAuthController: Symbol.for("AdminAuthController"),
    AdminController: Symbol.for("AdminController"),
    AdminUserController: Symbol.for('AdminUserController'),

}