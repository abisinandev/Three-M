import type { IUserRepository } from "@application/interfaces/repositories/user-repository.interface";
import type { UserEntity } from "@domain/entities/user.entity";
import {
  type UserDocument,
  UserModel,
} from "@infrastructure/databases/mongo_db/models/user.schema";
import { UserMapper } from "@infrastructure/mappers/user.mapper";
import { injectable } from "inversify";
import { BaseRepository } from "../base.repository";
 

@injectable()
export class UserRepository extends BaseRepository<UserEntity, UserDocument>
  implements IUserRepository {
  constructor() {
    super(UserModel, UserMapper);
  }

  async findByField(field: "email" | "phone", value: string): Promise<UserEntity | null> {
    const userDoc = await this.model.findOne({ [field]: value });
    if (!userDoc) return null;
    return this.mapper.toDomain(userDoc);
  }

  async verifyEmail(email: string): Promise<UserEntity | null> {
    const userDoc = await this.model.findOneAndUpdate(
      { email },
      { $set: { isEmailVerified: true } },
      { new: true },
    );
    if (!userDoc) return null;
    return this.mapper.toDomain(userDoc);
  }
}
