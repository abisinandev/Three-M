export interface JwtPayload {
    id: string;
    email: string;
    userCode?: string;
    role?: string;
    iat?: number;
    exp?: number;
}