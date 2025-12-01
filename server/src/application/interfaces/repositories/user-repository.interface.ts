import type { UserEntity } from "@domain/entities/user.entity";
import type { IBaseRepository } from "./base-repository.interface";
import { QueryOptions } from "mongoose";

type UserField = keyof Pick<UserEntity, "email" | "phone">;

export interface IUserRepository extends IBaseRepository<UserEntity> {

  findByField(field: UserField, value: string): Promise<UserEntity | null>;
  verifyEmail(email: string): Promise<UserEntity | null>;
  updatePassword(id: string, password: string): Promise<void>;
  findWithFilters(options: QueryOptions): Promise<UserEntity[]>;
  // findUserWithKyc(userId:string):Promise<void>;
}
