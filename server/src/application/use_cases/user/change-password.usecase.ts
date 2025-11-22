import { inject, injectable } from "inversify";
import { IBaseUseCase } from "../interfaces/base-usecase.interface";
import { BaseResponseDTO } from "@application/dto/auth/base-response.dto";
import { USER_TYPES } from "@infrastructure/inversify_di/types/user/user.types";
import { IUserRepository } from "@application/interfaces/repositories/user-repository.interface";
import { NotFoundError, ValidationError } from "@presentation/express/utils/error-handling";
import { ErrorMessage } from "@domain/enum/express/messages/error.message";
import { ChangePasswordDTO } from "@application/dto/user/change-password.dto";
import { AUTH_TYPES } from "@infrastructure/inversify_di/types/auth/auth.types";
import { IPasswordHashingService } from "@application/interfaces/services/auth/password-hashing.service.interface";
import { SuccessMessage } from "@domain/enum/express/messages/success.message";
import { HttpStatus } from "@domain/enum/express/status-code";

@injectable()
export class ChangePasswordUseCase implements IBaseUseCase<{ userId: string, data: ChangePasswordDTO }, BaseResponseDTO> {

    constructor(
        @inject(USER_TYPES.UserRepository) private readonly _userRepository: IUserRepository,
        @inject(AUTH_TYPES.IPasswordHashingService) private readonly _hashingService: IPasswordHashingService,
    ) { }

    async execute(req: { userId: string; data: ChangePasswordDTO; }): Promise<BaseResponseDTO<unknown>> {
        const { userId, data } = req
        const user = await this._userRepository.findById(userId);

        if (!user) throw new NotFoundError(ErrorMessage.USER_NOT_FOUND);

        const isMatch = await this._hashingService.verify(data.currentPassword, user.password);
        if (!isMatch) throw new ValidationError(ErrorMessage.INVALID_PASSWORD);

        const newHashedPassword = await this._hashingService.hash(data.newPassword);

        await this._userRepository.updatePassword(userId, newHashedPassword);

        return {
            success: true,
            message: SuccessMessage.PASSWORD_CHANGED,
            statusCode: HttpStatus.OK,
        }
    }
}