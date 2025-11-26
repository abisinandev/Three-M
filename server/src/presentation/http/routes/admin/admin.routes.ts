import { container } from "@infrastructure/inversify_di/inversify.di";
import { ADMIN_TYPES } from "@infrastructure/inversify_di/types/admin/admin.types";
import { AdminAuthMiddleware } from "@presentation/express/middlewares/admin-auth.middleware";
import { PROTECTED_ROUTES } from "@presentation/express/utils/constants/admin-routes.constants";
import { AdminAuthController } from "@presentation/http/controllers/admin/admin-auth.controller";
import { AdminUserController } from "@presentation/http/controllers/admin/admin-user.controller";
import type { AdminController } from "@presentation/http/controllers/admin/admin.controller";
import { Router } from "express";


const router = Router();

const adminController = container.get<AdminController>(ADMIN_TYPES.AdminController);
const authController = container.get<AdminAuthController>(ADMIN_TYPES.AdminAuthController);
const adminUserController = container.get<AdminUserController>(ADMIN_TYPES.AdminUserController);

router.get(PROTECTED_ROUTES.PROILE, AdminAuthMiddleware, adminController.getProfile.bind(adminController));
router.post(PROTECTED_ROUTES.LOGOUT, AdminAuthMiddleware, authController.logout.bind(authController));


router.get(PROTECTED_ROUTES.FETCH_USER, AdminAuthMiddleware, adminUserController.fetchUserDetails.bind(adminUserController));
router.get(PROTECTED_ROUTES.BLOCK_USER, AdminAuthMiddleware, adminUserController.blockUser.bind(adminUserController));
router.get(PROTECTED_ROUTES.UNBLOCK_USER, AdminAuthMiddleware, adminUserController.unblockUser.bind(adminUserController));

export default router