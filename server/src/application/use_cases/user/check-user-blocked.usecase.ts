import { inject, injectable } from "inversify";
import { ICheckUserBlockedUseCase } from "../interfaces/user/check-user-blocked-usecase.interface";
import { USER_TYPES } from "@infrastructure/inversify_di/types/user/user.types";
import { UserRepository } from "@infrastructure/databases/repository/auth/user.repository";
import { NotFoundError } from "@presentation/express/utils/error-handling";
import { ErrorMessage } from "@domain/enum/express/messages/error.message";

@injectable()
export class CheckUserBlockedUseCase implements ICheckUserBlockedUseCase {
    constructor(
        @inject(USER_TYPES.UserRepository) private readonly _userRepository: UserRepository,
    ) { }

    async execute(id: string): Promise<boolean> {
        const user = await this._userRepository.findById(id)
        if (!user) throw new NotFoundError(ErrorMessage.USER_NOT_FOUND);
        
        return user.isBlocked
    }
}