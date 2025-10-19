export type UserDTO = {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    role?: string;
    isVerified?: boolean;
    isSubscribed?: boolean;
}