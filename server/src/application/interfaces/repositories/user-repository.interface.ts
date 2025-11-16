import type { UserEntity } from "@domain/entities/user.entity";
import type { IBaseRepository } from "./base-repository.interface";
import type { UserDocument } from "@infrastructure/databases/mongo_db/models/user.schema";

type UserField = keyof Pick<UserEntity, "email" | "phone">;

export interface IUserRepository extends IBaseRepository<UserEntity, UserDocument> {
  
  findByField(field: UserField, value: string): Promise<UserEntity | null>;
  verifyEmail(email: string): Promise<UserEntity | null>;

}
