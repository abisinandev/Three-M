export enum AUTH_ROUTES {
    AUTH = "/",
    VERIFY_OTP = '/verify-otp',
    REFRESH_API = "/refresh",
    RESEND_OTP = "/resend-otp",
}


export enum PROTECTED_ROUTES {
    PROILE = "/profile",
    LOGOUT = "/logout",

    FETCH_USER = "/users",
    BLOCK_USER = "/user/block/:id",
    UNBLOCK_USER = "/user/unblock/:id",
}