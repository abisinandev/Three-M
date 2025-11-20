import type { CreateUserDTO } from "@application/dto/auth/create-user.dto";
import type { ResponseUserDTO } from "@application/dto/auth/response-user.dto";
import { UserEntity } from "@domain/entities/user.entity";
import { SubscripionPlan } from "@domain/enum/users/subscription-plan.enum";

// Dto => Domain
export function toEntity(dto: CreateUserDTO, hashedPassword: string): UserEntity {
  return UserEntity.create({
    fullName: dto.fullName,
    email: dto.email,
    phone: dto.phone,
    password: hashedPassword,
    role: dto.role,
  });
}

export function toUserResponse(entity: UserEntity): ResponseUserDTO {
  return {
    userCode: entity.userCode,
    fullName: entity.fullName,
    email: entity.email,
    phone: entity.phone,
    role: entity.role,
    isEmailVerified: entity.isEmailVerified ?? false,
    isVerified: entity.isVerified ?? false,
    isBlocked: entity.isBlocked ?? false,
    subscriptionStatus: entity.subscriptionStatus ?? SubscripionPlan.FREE,
    createdAt: entity.createdAt?.toISOString() ?? null,
  };
}
