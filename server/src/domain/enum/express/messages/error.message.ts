export enum ErrorMessage {
  USER_ALREADY_EXISTS = "User already exists",
  USER_NOT_FOUND = "User not found",
  INVALID_CREDENTIALS = "Invalid credentials",
  UNAUTHORIZED = "Unauthorized access",
  FORBIDDEN = "Access forbidden",
  VALIDATION_FAILED = "Validation failed",
  EMAIL_ALREADY_EXISTS = "Email already exists",
  PHONENO_ALREADY_EXISTS = "Phone number already exists",
  INTERNAL_SERVER_ERROR = "Internal server error",
  OTP_EXPIRED = "OTP expired or not found",
  INVALID_OTP = "Invalid OTP",
  ACCOUNT_BLOCKED = "Account is blocked",
  EMAIL_NOT_VERIFIED = "Email not verified",
  DB_CONNECTION_FAILED = "DATABASE_URI is not defined in .env",
  TWO_FA_REQUIRED = "2FA verification required",
  EMAIL_MUST_STRING = "Email must be a string",
  TWO_FA_NOT_CONFIGURED = '2FA not configured for this user',
  RESET_TOKEN_EXPIRED = "Reset token expired",
  RESET_TOKEN_INVALID = "RESET TOKEN IS INVALID",
  INVALID_PASSWORD = "Invalid old password",
  ADMIN_NOT_FOUND = "Admin not found",

  REFRESH_TOKEN_MISSING = "Refresh token is missing",
  REFRESH_TOKEN_EXPIRED = "Invalid or expired refresh token",
  REFRESH_TOKEN_NOT_FOUND ="Refresh token not found or already revoked"


}
