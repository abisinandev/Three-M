import { UserDTO } from "@application/dto/auth/response-user.dto";
import { IFetchUserDetails } from "../../interfaces/admin/fetch-user-details";
import { inject, injectable } from "inversify";
import { USER_TYPES } from "@infrastructure/inversify_di/types/user/user.types";
import { IUserRepository } from "@application/interfaces/repositories/user-repository.interface";
import { toUserResponse } from "@application/mappers/user/user.mapper";
import { QueryOptions } from "mongoose";
import { FetchDataResponseDTO } from "@application/dto/admin/fetch-data.response.dto";

@injectable()
export class FetchUserDetails implements IFetchUserDetails {
    constructor(
        @inject(USER_TYPES.UserRepository) private readonly _userRepository: IUserRepository,
    ) { }

    async execute(data: QueryOptions): Promise<FetchDataResponseDTO<UserDTO>> {

        const allUsers = await this._userRepository.findWithFilters({
            search: data.search,
            page: data.page,
            limit: data.limit,
            sortBy: data.sortBy,
            sortOrder: data.sortOrder
        });

        const { totalCount } = await this._userRepository.count();
        return {
            data: allUsers.map(user => toUserResponse(user)),
            total: totalCount,
            page: data.page || 1,
            limit: data.limit || 10,
            totalPages: Math.ceil(totalCount / (data.limit || 10))
        };
    }
} 