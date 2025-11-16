import { ResendOtpDTO } from "@application/dto/auth/resend-otp.dto";
import { VerifyOtpDTO } from "@application/dto/auth/verify-otp.dto";
import { container } from "@infrastructure/inversify_di/inversify.di";
import { AUTH_TYPES } from "@infrastructure/inversify_di/types/auth/auth.types";
import { validateDTO } from "@presentation/express/middlewares/validation-dto.middlewares";
import type { OtpController } from "@presentation/http/controllers/auth/otp.controller";
import { Router } from "express";

const router = Router();

const otpController = container.get<OtpController>(AUTH_TYPES.OtpController);

router.post("/verify-otp", validateDTO(VerifyOtpDTO), otpController.verifyOtp.bind(otpController));
router.post("/resend-otp", validateDTO(ResendOtpDTO), otpController.resendOtp.bind(otpController));

export default router;
