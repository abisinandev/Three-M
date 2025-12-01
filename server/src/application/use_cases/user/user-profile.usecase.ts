import type { IUserRepository } from "@application/interfaces/repositories/user-repository.interface";
import { inject, injectable } from "inversify";
import { USER_TYPES } from "@infrastructure/inversify_di/types/user/user.types";
import type { UserDTO } from "@application/dto/user/user-dto";
import type { IUserProfileInterface } from "../interfaces/user/user-profile-usecase.interface";
import { toUserResponse } from "@application/mappers/user/user.mapper";
import { UserEntity } from "@domain/entities/user.entity";
import { IKycRepository } from "@application/interfaces/repositories/kyc-repository.interface";
import { logger } from "@infrastructure/providers/logger/winston.logger";
import { KycEntity } from "@domain/entities/kyc.entity";

@injectable()
export class GetUserProfileUseCase implements IUserProfileInterface {
  constructor(
    @inject(USER_TYPES.UserRepository) private readonly _userRepository: IUserRepository,
    @inject(USER_TYPES.KycRepository) private readonly _kycRepository: IKycRepository,
  ) { }

  async execute(data: { userId: string; }): Promise<UserDTO> {
    const kycDetails = await this._kycRepository.findOne({ userId: data.userId });
    console.log(kycDetails,'=================')
    const user = await this._userRepository.findById(data.userId as string);
    logger.info(`User kyc: ${kycDetails}`);

    return toUserResponse(user as UserEntity, kycDetails as KycEntity);
  }
}