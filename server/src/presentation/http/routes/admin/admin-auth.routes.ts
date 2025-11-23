import { AdminAuthDTO } from "@application/dto/admin/admin-auth.dto";
import { VerifyOtpDTO } from "@application/dto/auth/verify-otp.dto";
import { container } from "@infrastructure/inversify_di/inversify.di";
import { ADMIN_TYPES } from "@infrastructure/inversify_di/types/admin/admin.types";
import { AdminAuthMiddleware } from "@presentation/express/middlewares/admin-auth.middleware";
import { validateDTO } from "@presentation/express/middlewares/validation-dto.middlewares";
import { ROUTES } from "@presentation/express/utils/constants/admin-routes.constants";
import type { AdminAuthController } from "@presentation/http/controllers/admin/admin-auth.controller";
import type { AdminController } from "@presentation/http/controllers/admin/admin.controller";
import { Router } from "express";

const router = Router();

const authController = container.get<AdminAuthController>(ADMIN_TYPES.AdminAuthController);
const adminController = container.get<AdminController>(ADMIN_TYPES.AdminController);

router.post(ROUTES.AUTH, validateDTO(AdminAuthDTO), authController.authentication.bind(authController));
router.post(ROUTES.VERIFY_OTP, validateDTO(VerifyOtpDTO), authController.veirfyOtp.bind(authController));
router.post(ROUTES.REFRESH_API, authController.refresh.bind(authController));


router.get(ROUTES.PROILE,AdminAuthMiddleware, adminController.getProfile.bind(adminController));
router.post(ROUTES.LOGOUT,AdminAuthMiddleware, authController.logout.bind(authController));

export default router