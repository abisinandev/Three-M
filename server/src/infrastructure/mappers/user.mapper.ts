import { UserEntity } from "@domain/entities/user.entity";
import { UserDocument } from "@infrastructure/databases/mongo_db/models/user.schema";

export class UserMapper {
  // Convert MongoDb -> Domain
  static toDomain(userDoc: UserDocument): UserEntity {
    return UserEntity.create({
      id: userDoc._id.toString(),
      fullName: userDoc.fullName,
      email: userDoc.email,
      phone: userDoc.phone,
      password: userDoc.password,
      isEmailVerified: userDoc.isEmailVerified,
      isBlocked: userDoc.isBlocked,
      isVerified: userDoc.isVerified,
      role: userDoc.role,
    });
  }

  // Convert Domain -> MongoDb
  static toPersistance(user: UserEntity): Partial<UserDocument> {
    return {
      _id: user.id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      password: user.password,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
      isVerified: user.isVerified,
      isBlocked: user.isBlocked,
      subscriptionStatus: user.subscriptionStatus,
    };
  }
}
