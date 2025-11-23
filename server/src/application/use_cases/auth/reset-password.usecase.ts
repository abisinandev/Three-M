import type { ResetPasswordDTO } from "@application/dto/auth/reset-password";
import { inject, injectable } from "inversify";
import { USER_TYPES } from "@infrastructure/inversify_di/types/user/user.types";
import type { IUserRepository } from "@application/interfaces/repositories/user-repository.interface";
import { NotFoundError, ValidationError } from "@presentation/express/utils/error-handling";
import { ErrorMessage } from "@domain/enum/express/messages/error.message";
import { redisClient } from "@infrastructure/providers/redis/redis.provider";
import crypto from "node:crypto";
import { AUTH_TYPES } from "@infrastructure/inversify_di/types/auth/auth.types";
import type { IPasswordHashingService } from "@application/interfaces/services/auth/password-hashing.service.interface";
import type { IResetPasswordUseCase } from "../interfaces/user/reset-password-usecase.interface";

@injectable()
export class ResetPasswordUseCase implements IResetPasswordUseCase {
    constructor(
        @inject(USER_TYPES.UserRepository) private readonly _userRepository: IUserRepository,
        @inject(AUTH_TYPES.IPasswordHashingService) private readonly _passwordHashingService: IPasswordHashingService,
    ) { }

    async execute(req: ResetPasswordDTO): Promise<void> {

        const user = await this._userRepository.findByField("email", req.email);
        if (!user) throw new NotFoundError(ErrorMessage.USER_NOT_FOUND);

        const redisKey = `reset-token:${req.resetToken}`;
        const storedHashedToken = await redisClient.get(redisKey);

        if (!storedHashedToken)
            throw new ValidationError(ErrorMessage.RESET_TOKEN_EXPIRED);

        const incomingHashedToken = crypto
            .createHash("sha256")
            .update(req.resetToken)
            .digest("hex");

        if (storedHashedToken !== incomingHashedToken)
            throw new ValidationError(ErrorMessage.RESET_TOKEN_INVALID);

        const hashedPassword = await this._passwordHashingService.hash(req.password);

        await this._userRepository.updatePassword(user.id as string, hashedPassword);
        await redisClient.del(redisKey);

    }
}