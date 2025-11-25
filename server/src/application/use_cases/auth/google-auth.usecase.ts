import { GoogleResponseDTO } from "@application/dto/auth/google-auth-reseponse.dto";
import { IGoogleAuthUseCase } from "../interfaces/user/google-auth.usecase.interface";
import { inject, injectable } from "inversify";
import { AUTH_TYPES } from "@infrastructure/inversify_di/types/auth/auth.types";
import { IGoogleAuthService } from "@application/interfaces/services/auth/google-auth.service.interface";
import { UnauthorizedError, ValidationError } from "@presentation/express/utils/error-handling";
import { ErrorMessage } from "@domain/enum/express/messages/error.message";
import { USER_TYPES } from "@infrastructure/inversify_di/types/user/user.types";
import { IUserRepository } from "@application/interfaces/repositories/user-repository.interface";
import { AuthProvider } from "@domain/enum/users/auth-provider.enum";
import { IJwtProvider } from "@application/interfaces/services/auth/jwt.provider.interface";
import { JwtPayload } from "@domain/types/jwt-payload.type";
import { UserEntity } from "@domain/entities/user.entity";

@injectable()
export class GoogleAuthUseCase implements IGoogleAuthUseCase {

    constructor(
        @inject(AUTH_TYPES.GoogleAuthService) private readonly _googleAuthServie: IGoogleAuthService,
        @inject(USER_TYPES.UserRepository) private readonly _userRepository: IUserRepository,
        @inject(AUTH_TYPES.IJwtProvider) private readonly _jwtProvider: IJwtProvider,

    ) { }

    async execute(data: { provider: "google"; token: string; }): Promise<GoogleResponseDTO> {

        console.log('data==', data)
        const {
            email,
            emailVerified,
            id,
            name,
            avatar,
        } = await this._googleAuthServie.verifyToken(data.token);

        if (!emailVerified) {
            throw new UnauthorizedError(ErrorMessage.EMAIL_NOT_VERIFIED)
        }

        let user = await this._userRepository.findByField("email", email)

        if (!user) {
            const user = UserEntity.createSocialUser({
                email,
                fullName: name,
                avatar,
                provider: AuthProvider.GOOGLE,
                googleId: id
            })
            await this._userRepository.create(user)
        }

        user = await this._userRepository.findByField("email", email);
        if (!user) throw new ValidationError(ErrorMessage.USER_NOT_FOUND);

        const payload: JwtPayload = {
            id: user.id as string,
            userCode: user.userCode as string,
            role: user.role,
            email: user.email
        };

        const accessToken = this._jwtProvider.generateAccessToken(payload);
        const refreshToken = this._jwtProvider.generateRefreshToken(payload);
        return { accessToken, refreshToken }
    }
}