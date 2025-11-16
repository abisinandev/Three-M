export interface ResendOtpResponseDTO {
    success: boolean;
    message: string;
    statusCode: number;
    expiresAt: number;
    resendCount: number;
}
