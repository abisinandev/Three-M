import { inject, injectable } from "inversify";
import { IUserRepository } from "@application/interfaces/repositories/user-repository.interface";
import { CreateUserDTO } from "@application/dto/auth-dto/create-user.dto";
import { IBaseUseCase } from "../interfaces/base-usercase.interface";
import { IVerificationService } from "@application/interfaces/services/user-verfication.service.interface";
import { UserMapper } from "@application/mappers/user/user.mapper";
import { IPasswordHashingService } from "@application/interfaces/services/password-hashing.service.interface";
import { AUTH_TYPES } from "@infrastructure/inversify_di/types/auth/auth.types";
import { USER_TYPES } from "@infrastructure/inversify_di/types/user/user.types";
import { ConflictError } from '@presentation/express/utils/error-handling/index'
import { ErrorMessage } from "@domain/enum/express/messages/error.message";
import { SuccessMessage } from "@domain/enum/express/messages/success.message";

@injectable()
export class UserSignupUseCase implements IBaseUseCase<CreateUserDTO, { message: string }> {

    constructor(
        @inject(USER_TYPES.IUserRepository) private readonly _userRepository: IUserRepository,
        @inject(AUTH_TYPES.IVerificationService) private readonly _userVerification: IVerificationService,
        @inject(AUTH_TYPES.IPasswordHashingService) private readonly _passswordHashing: IPasswordHashingService
    ) { }

    async execute(user: CreateUserDTO): Promise<{ success: boolean, message: string }> {

        const isExistingUser = await this._userRepository.findByField('email', user.email);

        if (isExistingUser) {

            if (isExistingUser.isEmailVerified) {
                throw new ConflictError(ErrorMessage.EMAIL_ALREADY_EXISTS)
            }

            await this._userVerification.sendVerification(user.email)
            return { success: true, message: SuccessMessage.ACCOUNT_EXISTS_EMAIL_NOT_VERIFIED };
        }

        const isExistingPhone = await this._userRepository.findByField('phone', user.phone);
        if (isExistingPhone) {
            throw new ConflictError(ErrorMessage.PHONENO_ALREADY_EXISTS)
        }

        const hashedPassword = await this._passswordHashing.hash(user.password);
        const newUser = UserMapper.toEntity(user, hashedPassword);

        await this._userRepository.create(newUser);
        await this._userVerification.sendVerification(user.email);
        return { success: true, message: SuccessMessage.OTP_SEND };
    }
}

