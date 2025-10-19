import { User } from "../../entities/User";

type UserField = keyof Pick<User, 'email' | 'phone'>

export interface IUserRepository {
    create(user: User): Promise<void>

    findByField(field: UserField, value: string): Promise<User | null>

    findById(id: string): Promise<User | null>
}

