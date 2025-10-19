import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/interfaces/repositories/IUserRepository";
import UserSchema from "../database/userSchema";

export class UserRepository implements IUserRepository {

    async create(user: User): Promise<void> {
        await UserSchema.create(user)
    }

    async findById(id: string): Promise<User | null> {
        return await UserSchema.findById({ _id: id })
    }

    async findByField(field: "email" | "phone", value: string): Promise<User | null> {
        return await UserSchema.findOne({ [field]: value })
    }
}