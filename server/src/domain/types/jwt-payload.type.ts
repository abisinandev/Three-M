export interface JwtPayload {
    id: string;
    email: string;
    userCode?: string;
    adminCode?: string;
    role?: string;
    iat?: number;
    exp?: number;
}