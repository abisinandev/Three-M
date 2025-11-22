import type { BaseResponseDTO } from "@application/dto/auth/base-response.dto";
import type { UserLoginDTO } from "@application/dto/auth/user-login.dto";
import type { IUserRepository } from "@application/interfaces/repositories/user-repository.interface";
import type { ITwoFactorAuthSetup } from "@application/interfaces/services/auth/2fa-auth-setup.interface";
import type { IPasswordHashingService } from "@application/interfaces/services/auth/password-hashing.service.interface";
import type { IBaseUseCase } from "@application/use_cases/interfaces/base-usecase.interface";
import { ErrorMessage } from "@domain/enum/express/messages/error.message";
import { SuccessMessage } from "@domain/enum/express/messages/success.message";
import { HttpStatus } from "@domain/enum/express/status-code";
import { AUTH_TYPES } from "@infrastructure/inversify_di/types/auth/auth.types";
import { USER_TYPES } from "@infrastructure/inversify_di/types/user/user.types";
import { ForbiddenError, NotFoundError, UnauthorizedError } from "@presentation/express/utils/error-handling";
import { inject, injectable } from "inversify";

@injectable()
export class UserLoginUseCase implements IBaseUseCase<UserLoginDTO, BaseResponseDTO> {

    constructor(
        @inject(USER_TYPES.UserRepository) private readonly _userRepository: IUserRepository,
        @inject(AUTH_TYPES.IPasswordHashingService) private readonly _passwordHashing: IPasswordHashingService,
        @inject(AUTH_TYPES.TwoFactorAuthSetup) private readonly _twoFactorAuthSetup: ITwoFactorAuthSetup,
    ) { }

    async execute(user: UserLoginDTO): Promise<BaseResponseDTO> {

        const existingUser = await this._userRepository.findByField("email", user.email as string);

        if (!existingUser) throw new NotFoundError(ErrorMessage.USER_NOT_FOUND);
        if (existingUser.isBlocked) throw new ForbiddenError(ErrorMessage.ACCOUNT_BLOCKED);
        if (!existingUser.isEmailVerified) new ForbiddenError(ErrorMessage.EMAIL_NOT_VERIFIED)

        const isMatch = await this._passwordHashing.verify(user.password, existingUser.password);
        if (!isMatch) throw new UnauthorizedError(ErrorMessage.INVALID_CREDENTIALS);

        if (!existingUser.isTwoFactorEnabled) {
            const { secret, qrCode } = await this._twoFactorAuthSetup.setTwoFactor(existingUser.email, 'three_M');
            await this._userRepository.update(
                existingUser.id as string, {
                twoFactorSecret: secret,
                qrCodeUrl: qrCode,
                isTwoFactorEnabled: true
            }
            )

            return {
                success: true,
                message: SuccessMessage.TWO_FA_REQUIRED,
                statusCode: HttpStatus.OK,
                data: { qrCode },
                requires2FASetup: true,
            };
        }


        return {
            success: true,
            message: SuccessMessage.PLEASE_VERIFY_2FA_CODE,
            statusCode: HttpStatus.OK,
            data: { qrCode: existingUser.qrCodeUrl },
            requires2FASetup: false,
        };

    }
}