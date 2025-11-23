export const ADMIN_TYPES = {
    //REPOSITORY
    AdminRepository: Symbol.for("AdminRepository"),

    //USECASES
    AdminAuthUseCase: Symbol.for("AdminAuthUseCase"),
    AdminAuthVerifyOtpUseCase: Symbol.for("AdminAuthVerifyOtpUseCase"),
    AdminRefreshTokenUseCase: Symbol.for('AdminRefreshTokenUseCase'),
    AdminLogoutUseCase: Symbol.for('AdminLogoutUseCase'),
    AdminProfileUseCase: Symbol.for('AdminProfileUseCase'),

    AdminAuthController: Symbol.for("AdminAuthController"),
    AdminController:Symbol.for("AdminController"),

}