import { container } from "@infrastructure/inversify_di/inversify.di";
import { USER_TYPES } from "@infrastructure/inversify_di/types/user/user.types";
import { Routes } from "@presentation/express/utils/constants/user-routes.constants";
import { AuthMiddleware } from "@presentation/express/middlewares/auth.middlware";
import type { UserController } from "@presentation/http/controllers/user/user.controller";
import { Router } from "express";

const router = Router();

const userController = container.get<UserController>(
    USER_TYPES.UserController
)

router.get(Routes.PROFILE, AuthMiddleware, userController.getProfile.bind(userController));

export default router