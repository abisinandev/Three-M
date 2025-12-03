import type { IKycRepository } from "@application/interfaces/repositories/kyc-repository.interface";
import type { KycEntity } from "@domain/entities/kyc.entity";
import {
  type KycDocument,
  KycModel,
} from "@infrastructure/databases/mongo_db/models/schemas/kyc.schema";
import { KycMapper } from "@infrastructure/mappers/kyc.mapper";
import { injectable } from "inversify";
import type { QueryOptions } from "mongoose";
import { BaseRepository } from "../base.repository";

@injectable()
export class KycRepository
  extends BaseRepository<KycEntity, KycDocument>
  implements IKycRepository
{
  constructor() {
    super(KycModel, KycMapper);
  }

  async findWithFilters(options: QueryOptions): Promise<KycEntity[]> {
    const {
      page = 1,
      limit = 10,
      status,
      // search = "",
      // searchFields = ["fullName", "email", "userCode"],
      sortBy = "createdAt",
      sortOrder = "desc",
    } = options;

    const skip = (page - 1) * limit;

    const finalFilter: any = {};
    if (status) finalFilter.status = !status.length ? "" : status;

    // if (search.trim()) {
    //     const regex = { $regex: search.trim(), $options: "i" };
    //     finalFilter.$or = searchFields.map((field) => ({
    //         [field]: regex
    //     }));
    // }

    const sort: Record<string, 1 | -1> = {
      [sortBy]: sortOrder === "asc" ? 1 : -1,
    };

    const docs = await this.model
      .find(finalFilter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .exec();

    return Promise.all(docs.map((doc) => this.mapper.toDomain(doc)));
  }

  async updateKycDoc(
    kydId: string,
    query: { isKycVerified: boolean; status: string; rejectionReason?: string },
  ): Promise<KycEntity | null> {
    return await this.model.findByIdAndUpdate(kydId, query, { new: true });
  }
}
