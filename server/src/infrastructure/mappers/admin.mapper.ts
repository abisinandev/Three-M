import { AdminEntity } from "@domain/entities/admin.entity";
import type { AdminDocument } from "@infrastructure/databases/mongo_db/models/schemas/admin.schema";

export const toDomain = (doc: AdminDocument): AdminEntity => {
  return AdminEntity.reconstitute({
    id: doc._id,
    adminCode: doc.adminCode,
    fullName: doc.email,
    email: doc.email,
    password: doc.password,
    role: doc.role,
    isBlocked: doc.isBlocked,
    createdAt: doc.createdAt,
    profile: doc.profile,
    permissions: doc.permissions,
  });
};

export const toPersistance = (data: AdminEntity): Partial<AdminDocument> => {
  return {
    _id: data.id,
    adminCode: data.adminCode,
    fullName: data.fullName,
    email: data.email,
    password: data.password,
    role: data.role,
    isBlocked: data.isBlocked,
    createdAt: data.createdAt,
    profile: data.profile,
    permissions: data.permissions,
  };
};

export const AdminMapper = {
  toDomain,
  toPersistance,
};
