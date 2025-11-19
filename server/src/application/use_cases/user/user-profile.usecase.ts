import type { IUserRepository } from "@application/interfaces/repositories/user-repository.interface";
import { inject, injectable } from "inversify";
import { USER_TYPES } from "@infrastructure/inversify_di/types/user/user.types";
import type { ResponseUserDTO } from "@application/dto/auth/response-user.dto";
import type { IBaseUseCase } from "../interfaces/base-usecase.interface";
import type{ BaseResponseDTO } from "@application/dto/auth/base-response.dto";
import { SuccessMessage } from "@domain/enum/express/messages/success.message";
import { HttpStatus } from "@domain/enum/express/status-code";

@injectable()
export class GetUserProfileUseCase implements IBaseUseCase<{ userId: string }, BaseResponseDTO<ResponseUserDTO>> {
  constructor(
    @inject(USER_TYPES.UserRepository) private readonly _userRepository: IUserRepository,
  ) { }

  async execute(req: { userId: string; }): Promise<BaseResponseDTO<ResponseUserDTO>> {
    const user = await this._userRepository.findById(req.userId as string);

    return {
      success: true,
      message: SuccessMessage.DATA_FETCHED,
      statusCode: HttpStatus.OK,
      data: {
        userCode: user?.userCode as string,
        fullName: user?.fullName as string,
        email: user?.email as string,
        phone: user?.phone as string,
        role: user?.role as string,
        isBlocked: user?.isBlocked,
        isEmailVerified: user?.isEmailVerified,
        isVerified: user?.isVerified,
        subscriptionStatus: user?.subscriptionStatus
      }
    };
  }
}
