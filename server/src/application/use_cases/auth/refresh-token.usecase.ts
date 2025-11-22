import type { RefreshDTO } from "@application/dto/auth/refresh.dto";
import type { IBaseUseCase } from "../interfaces/base-usecase.interface";
import type { RefreshResponseDTO } from "@application/dto/auth/refresh-response.dto";
import { NotFoundError, ValidationError } from "@presentation/express/utils/error-handling";
import { inject, injectable } from "inversify";
import { AUTH_TYPES } from "@infrastructure/inversify_di/types/auth/auth.types";
import type { IJwtProvider } from "@application/interfaces/services/auth/jwt.provider.interface";
import { USER_TYPES } from "@infrastructure/inversify_di/types/user/user.types";
import type { IUserRepository } from "@application/interfaces/repositories/user-repository.interface";
import type { JwtPayload } from "@domain/types/jwt-payload.type";
import { ErrorMessage } from "@domain/enum/express/messages/error.message";
import { redisClient } from "@infrastructure/providers/redis/redis.provider";

@injectable()
export class RefreshTokenUseCase implements IBaseUseCase<RefreshDTO, RefreshResponseDTO> {
    constructor(
        @inject(AUTH_TYPES.IJwtProvider) private readonly _jwtProvider: IJwtProvider,
        @inject(USER_TYPES.UserRepository) private readonly _userRepository: IUserRepository,
    ) { }
    async execute(req: RefreshDTO): Promise<RefreshResponseDTO> {

        if (!req.refreshToken) throw new ValidationError(ErrorMessage.REFRESH_TOKEN_MISSING);
        const decoded = this._jwtProvider.verifyJwtTokens(req.refreshToken, "refresh");

        if (typeof decoded === "string" || !decoded.id) {
            throw new ValidationError(ErrorMessage.REFRESH_TOKEN_EXPIRED);
        }

        const storedToken = await redisClient.hgetall(`refresh_token:${decoded.id}`);

        if (!storedToken || storedToken.refreshToken !== req.refreshToken) {
            throw new ValidationError(ErrorMessage.REFRESH_TOKEN_NOT_FOUND)
        }

        const user = await this._userRepository.findByField("email", decoded.email);
        if (!user) throw new NotFoundError(ErrorMessage.USER_NOT_FOUND);

        const payload: JwtPayload = {
            id: user.id as string,
            userCode: user.userCode,
            role: user.role,
            email: user.email
        };
        const newAccessToken = this._jwtProvider.generateAccessToken(payload);

        return { accessToken: newAccessToken }
    }
}