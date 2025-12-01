import { KycEntity } from "@domain/entities/kyc.entity";
import { IBaseRepository } from "./base-repository.interface";
import { QueryOptions } from "mongoose";

export interface IKycRepository extends IBaseRepository<KycEntity> {
    findWithFilters(options: QueryOptions): Promise<KycEntity[]>;
    updateKycDoc(kydId: string, query: { isKycVerified: boolean; status: string; rejectionReason?: string }): Promise<KycEntity | null>;
}