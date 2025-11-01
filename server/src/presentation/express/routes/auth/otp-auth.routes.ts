import { ResendOtpDTO } from "@application/dto/auth-dto/resend-otp.dto";
import { VerifyOtpDTO } from "@application/dto/auth-dto/verify-otp.dto";
import { OtpController } from "@presentation/http/controllers/auth/otp.controller";
import { validateDTO } from "@presentation/express/middlewares/validation-dto.middlewares";
import { container } from "@infrastructure/inversify_di/inversify.di";
import { Router } from "express";
import { AUTH_TYPES } from "@infrastructure/inversify_di/types/auth/auth.types";
import { asyncHandler } from "@presentation/express/utils/async-handler";

const router = Router();

const otpController = container.get<OtpController>(AUTH_TYPES.OtpController);

router.post("/verify-otp", validateDTO(VerifyOtpDTO),asyncHandler(otpController.verifyOtp.bind(otpController)));
router.post("/resend-otp",validateDTO(ResendOtpDTO),asyncHandler(otpController.resendOtp.bind(otpController)));

export default router;
