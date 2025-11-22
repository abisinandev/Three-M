import { ChangePasswordDTO } from "@application/dto/user/change-password.dto";
import { container } from "@infrastructure/inversify_di/inversify.di";
import { USER_TYPES } from "@infrastructure/inversify_di/types/user/user.types";
import { AuthMiddleware } from "@presentation/express/middlewares/auth.middleware";
import { validateDTO } from "@presentation/express/middlewares/validation-dto.middlewares";
import { Routes } from "@presentation/express/utils/constants/user-routes.constants";
import type { UserController } from "@presentation/http/controllers/user/user.controller";
import { Router } from "express";

const router = Router();

const userController = container.get<UserController>(
    USER_TYPES.UserController
)

router.get(Routes.PROFILE, AuthMiddleware, userController.getProfile.bind(userController));
router.post(Routes.CHANGE_PASSWORD, AuthMiddleware, validateDTO(ChangePasswordDTO), userController.ChangePassord.bind(userController));

export default router