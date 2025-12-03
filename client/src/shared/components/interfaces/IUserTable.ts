export interface User {
    id: string;
    userCode: string;
    fullName: string;
    email: string;
    isBlocked: 'Active' | 'Blocked' | 'Pending';
    isVerified: true;
    createdAt: string;
}