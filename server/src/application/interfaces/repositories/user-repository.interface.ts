import { UserEntity } from "@domain/entities/user.entity";
import { IBaseRepository } from "./base-repository.interface";

type UserField = keyof Pick<UserEntity, "email" | "phone">;

export interface IUserRepository extends IBaseRepository<UserEntity> {
  findByField(field: UserField, value: string): Promise<UserEntity | null>;

  verifyEmail(email: string): Promise<UserEntity | null>;
}
