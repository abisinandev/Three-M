import { CreateUserDTO } from "@application/dto/auth-dto/create-user.dto";
import { ResponseUserDTO } from "@application/dto/auth-dto/response-user.dto";
import { UserEntity } from "@domain/entities/user.entity";
import { SubscripionPlan } from "@domain/enum/users/subscription-plan.enum";
import { UserRole } from "@domain/enum/users/user-role.enum";
import { Email } from "@domain/value-objects/user/email.vo";
import { Password } from "@domain/value-objects/user/password.vo";
import { Phone } from "@domain/value-objects/user/phone.vo";

export class UserMapper {
  static toEntity(dto: CreateUserDTO, hashedPassword: string): UserEntity {
    return new UserEntity(
      dto.fullName,
      Email.create(dto.email),
      Phone.create(dto.phone),
      Password.create(hashedPassword),
      dto.role ?? UserRole.USER,
    );
  }

  static toResponse(entity: UserEntity): ResponseUserDTO {
    return {
      id: entity.id ?? "",
      fullName: entity.fullName,
      email: entity.email,
      phone: entity.phone,
      role: entity.role,
      isEmailVerified: entity.isEmailVerified ?? false,
      isVerified: entity.isVerified ?? false,
      isBlocked: entity.isBlocked ?? false,
      subscriptionStatus: entity.subscriptionStatus ?? SubscripionPlan.FREE,
    };
  }
}
