import type { IUserRepository } from "@application/interfaces/repositories/user-repository.interface";
import { inject, injectable } from "inversify";
import { USER_TYPES } from "@infrastructure/inversify_di/types/user/user.types";
import type { ResponseUserDTO } from "@application/dto/auth/response-user.dto";
import type { IUserProfileInterface } from "../interfaces/user/user-profile-usecase.interface";
import { toUserResponse } from "@application/mappers/user/user.mapper";
import { UserEntity } from "@domain/entities/user.entity";

@injectable()
export class GetUserProfileUseCase implements IUserProfileInterface {
  constructor(
    @inject(USER_TYPES.UserRepository) private readonly _userRepository: IUserRepository,
  ) { }

  async execute(data: { userId: string; }): Promise<ResponseUserDTO> {
    const user = await this._userRepository.findById(data.userId as string);

    // return {
    //   userCode: user?.userCode as string,
    //   fullName: user?.fullName as string,
    //   email: user?.email as string,
    //   phone: user?.phone as string,
    //   role: user?.role as string,
    //   isBlocked: user?.isBlocked,
    //   isEmailVerified: user?.isEmailVerified,
    //   isVerified: user?.isVerified,
    //   subscriptionStatus: user?.subscriptionStatus,
    //   createdAt: user?.createdAt?.toLocaleDateString() as string,
    // }
    return toUserResponse(user as UserEntity);
  }
}