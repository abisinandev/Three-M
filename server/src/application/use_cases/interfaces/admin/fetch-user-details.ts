import { FetchDataResponseDTO } from "@application/dto/admin/fetch-data.response.dto";
import { UserDTO } from "@application/dto/auth/response-user.dto";
import { QueryOptions } from "mongoose";

export interface IFetchUserDetails {
    execute(data: QueryOptions): Promise<FetchDataResponseDTO<UserDTO>>;
}