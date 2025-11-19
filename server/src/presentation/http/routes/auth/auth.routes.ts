import { Verify2faDTO } from "@application/dto/auth/2fa-verify-dto";
import { CreateUserDTO } from "@application/dto/auth/create-user.dto";
import { UserLoginDTO } from "@application/dto/auth/user-login.dto";
import { container } from "@infrastructure/inversify_di/inversify.di";
import { AUTH_TYPES } from "@infrastructure/inversify_di/types/auth/auth.types";
import { Routes } from "@presentation/express/utils/constants/user-routes.constants";
import { AuthMiddleware } from "@presentation/express/middlewares/auth.middlware";
import { validateDTO } from "@presentation/express/middlewares/validation-dto.middlewares";
import type { AuthController } from "@presentation/http/controllers/auth/auth.controller";
import { Router } from "express";
import { ForgotPasswordDTO } from "@application/dto/auth/forgot-password";
import { ResendOtpDTO } from "@application/dto/auth/resend-otp.dto";
import { VerifyOtpDTO } from "@application/dto/auth/verify-otp.dto";
import { ResetPasswordDTO } from "@application/dto/auth/reset-password";

const router = Router();

const authController = container.get<AuthController>(
  AUTH_TYPES.AuthController,
);

router.post(Routes.SIGNUP, validateDTO(CreateUserDTO), authController.signup.bind(authController));
router.post(Routes.LOGIN, validateDTO(UserLoginDTO), authController.login.bind(authController));
router.post(Routes.TWO_FA_VERIFY, validateDTO(Verify2faDTO), authController.verifyTwoFactor.bind(authController));
router.post((Routes.REFRESH), authController.refresh.bind(authController));
router.post(Routes.LOGOUT, AuthMiddleware, authController.logout.bind(authController));
router.post(Routes.VERIFY_OTP, validateDTO(VerifyOtpDTO), authController.verifySignupOtp.bind(authController));
router.post(Routes.RESEND_OTP, validateDTO(ResendOtpDTO), authController.resendOtp.bind(authController));
router.post(Routes.FORGOT_PASSWORD, validateDTO(ForgotPasswordDTO), authController.forgotPassword.bind(authController))
router.post(Routes.FORGOT_PASS_VERIFY_OTP, validateDTO(VerifyOtpDTO), authController.forgotPasswordVeirfyOtp.bind(authController));
router.post(Routes.FORGOT_PASS_RESENT_OTP, validateDTO(ResendOtpDTO), authController.forgotPasswordResendOtp.bind(authController));
router.post(Routes.RESET_PASSWORD, validateDTO(ResetPasswordDTO), authController.resetPassword.bind(authController));

export default router;
