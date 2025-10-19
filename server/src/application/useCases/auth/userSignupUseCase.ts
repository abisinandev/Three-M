import { User } from "../../../domain/entities/User";
import { IUserRepository } from "../../../domain/interfaces/repositories/IUserRepository";
import { PasswordHasher } from "../../../infrastructure/externals/PasswordHash";
import AppError from "../../../shared/errors/appError";

export class UserSignupUseCase {

    private hasher = new PasswordHasher()

    constructor(private userRepository: IUserRepository) { }

    async execute(user: User): Promise<{ message: string }> {

        const isExistingEmail = await this.userRepository.findByField('email', user.email);
        if (isExistingEmail) {
            throw new AppError('Email already registered', 409);
        }

        const isExistingPhone = await this.userRepository.findByField('phone', user.phone);
        if (isExistingPhone) {
            throw new AppError('Phone number already registered', 409);
        }

        const hashedPassword = await this.hasher.hash(user.getPassword());

        const newUser = new User(
            user.fullName,
            user.email,
            user.phone,
            hashedPassword,
            user.role,
            user.isVerified,
            user.isSubscribed
        )

        await this.userRepository.create(newUser);
        return { message: "Registration successfull" };
    }
}

