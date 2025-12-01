import { FetchDataResponseDTO } from "@application/dto/admin/fetch-data.response.dto";
import { KycResponseDTO } from "@application/dto/user/kyc-response.dto";
import { QueryOptions } from "mongoose";

export interface IFetchAllKycDocsUseCase {
    execute(data: QueryOptions): Promise<FetchDataResponseDTO<KycResponseDTO>>
}