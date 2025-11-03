import { Router } from "express";
import { UserAuthController } from "@presentation/http/controllers/user/user-auth.controller";
import { validateDTO } from "@presentation/express/middlewares/validation-dto.middlewares";
import { CreateUserDTO } from "@application/dto/auth-dto/create-user.dto";
import { container } from "@infrastructure/inversify_di/inversify.di";
import { USER_TYPES } from "@infrastructure/inversify_di/types/user/user.types";

const router = Router();

const authController = container.get<UserAuthController>(
  USER_TYPES.UserAuthController,
);

router.post("/signup", validateDTO(CreateUserDTO), authController.signup.bind(authController));

export default router;
