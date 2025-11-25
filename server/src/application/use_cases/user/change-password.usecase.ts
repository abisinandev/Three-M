import { inject, injectable } from "inversify";
import { USER_TYPES } from "@infrastructure/inversify_di/types/user/user.types";
import type { IUserRepository } from "@application/interfaces/repositories/user-repository.interface";
import { NotFoundError, ValidationError } from "@presentation/express/utils/error-handling";
import { ErrorMessage } from "@domain/enum/express/messages/error.message";
import type { ChangePasswordDTO } from "@application/dto/user/change-password.dto";
import { AUTH_TYPES } from "@infrastructure/inversify_di/types/auth/auth.types";
import type { IPasswordHashingService } from "@application/interfaces/services/auth/password-hashing.service.interface";
import type { IChangePasswordUseCase } from "../interfaces/user/change-password.usecase.interface";

@injectable()
export class ChangePasswordUseCase implements IChangePasswordUseCase {

    constructor(
        @inject(USER_TYPES.UserRepository) private readonly _userRepository: IUserRepository,
        @inject(AUTH_TYPES.IPasswordHashingService) private readonly _hashingService: IPasswordHashingService,
    ) { }

    async execute(dto: { userId: string, data: ChangePasswordDTO }): Promise<void> {
        const { userId, data } = dto
        const user = await this._userRepository.findById(userId);

        if (!user) throw new NotFoundError(ErrorMessage.USER_NOT_FOUND);

        const isMatch = await this._hashingService.verify(data.currentPassword, user.password as string);
        if (!isMatch) throw new ValidationError(ErrorMessage.INVALID_PASSWORD);

        const newHashedPassword = await this._hashingService.hash(data.newPassword);
        await this._userRepository.updatePassword(userId, newHashedPassword);
    }
}