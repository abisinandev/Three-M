import { Verify2faDTO } from "@application/dto/auth/2fa-verify-dto";
import { CreateUserDTO } from "@application/dto/auth/create-user.dto";
import { RefreshDTO } from "@application/dto/auth/refresh.dto";
import { UserLoginDTO } from "@application/dto/auth/user-login.dto";
import { container } from "@infrastructure/inversify_di/inversify.di";
import { AUTH_TYPES } from "@infrastructure/inversify_di/types/auth/auth.types";
import { Routes } from "@presentation/express/utils/constants/user-routes.constants";
import { AuthMiddleware } from "@presentation/express/middlewares/auth.middlware";
import { validateDTO } from "@presentation/express/middlewares/validation-dto.middlewares";
import type { AuthController } from "@presentation/http/controllers/auth/auth.controller";
import { Router } from "express";

const router = Router();

const authController = container.get<AuthController>(
  AUTH_TYPES.AuthController,
);

router.post(Routes.SIGNUP, validateDTO(CreateUserDTO), authController.signup.bind(authController));
router.post(Routes.LOGIN, validateDTO(UserLoginDTO), authController.login.bind(authController));
router.post(Routes.TWO_FA_VERIFY, validateDTO(Verify2faDTO), authController.verifyTwoFactor.bind(authController));
router.post((Routes.REFRESH), authController.refresh.bind(authController));
router.post(Routes.LOGOUT, AuthMiddleware, authController.logout.bind(authController));
export default router;
