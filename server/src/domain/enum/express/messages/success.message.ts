export enum SuccessMessage {
  USER_REGISTERED = "User registered successfully",
  LOGGED_IN_SUCCESS = "Logged in successfully",
  USER_UPDATED = "User updated successfully",
  USER_DELETED = "User deleted successfully",

  EMAIL_VERIFIED = "Email verified successfully. You can now log in",

  EMAIL_SENT = "Email sent successfully",
  PASSWORD_CHANGED = "Password changed successfully",
  PASSWORD_RESET = "Password reset successfully",

  OTP_SEND = "Otp send to email, Please check your inbox to verify your email and activate your account.",
  DATA_FETCHED = "Data fetched successfully",
  DATA_SAVED = "Data saved successfully",
  DATA_UPDATED = "Data updated successfully",
  DATA_DELETED = "Data deleted successfully",

  OPERATION_SUCCESSFUL = "Operation completed successfully",

  ACCOUNT_EXISTS_EMAIL_NOT_VERIFIED = "Account exists but not verified. OTP resent to your email.",
  TWOFA_AUTHENTICATION_DONE = "2-Factor-authentication verified",
  TWO_FA_REQUIRED = "2FA setup required",

  PLEASE_VERIFY_2FA_CODE = 'Please verify your 2FA code',
}
