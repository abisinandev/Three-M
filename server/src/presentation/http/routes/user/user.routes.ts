import { ChangePasswordDTO } from "@application/dto/user/change-password.dto";
import { KycSubmitDTO } from "@application/dto/user/kyc-submit.dto";
import { SignatureUploadDTO } from "@application/dto/user/signature-upload.dto";
import { container } from "@infrastructure/inversify_di/inversify.di";
import { USER_TYPES } from "@infrastructure/inversify_di/types/user/user.types";
import { validateDTO } from "@presentation/express/middlewares/validation-dto.middlewares";
import { Routes } from "@presentation/express/utils/constants/user-routes.constants";
import type { UserController } from "@presentation/http/controllers/user/user.controller";
import { Router } from "express";

const router = Router();

const userController = container.get<UserController>(USER_TYPES.UserController);

router.get(Routes.PROFILE, userController.getProfile.bind(userController));
router.post(Routes.CHANGE_PASSWORD, validateDTO(ChangePasswordDTO), userController.ChangePassord.bind(userController));
router.get(Routes.KYC_SIGNINATURE, userController.signUpload.bind(userController));
router.post(Routes.KYC_SUBMIT, validateDTO(KycSubmitDTO), userController.kycSubmit.bind(userController));
router.post(Routes.LOGOUT, userController.logout.bind(userController));

export default router