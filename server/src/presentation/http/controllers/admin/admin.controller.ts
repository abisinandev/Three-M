import type { IAdminProfileUseCase } from "@application/use_cases/interfaces/admin/admin-profile-usecase.interface";
import { SuccessMessage } from "@domain/enum/express/messages/success.message";
import { HttpStatus } from "@domain/enum/express/status-code";
import { ADMIN_TYPES } from "@infrastructure/inversify_di/types/admin/admin.types";
import type { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";

@injectable()
export class AdminController {
  constructor(
    @inject(ADMIN_TYPES.AdminProfileUseCase)
    private readonly _adminProfileUseCase: IAdminProfileUseCase,
  ) {}

  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const adminId = req?.user?.id;
      const result = await this._adminProfileUseCase.execute({
        id: adminId as string,
      });
      res.status(HttpStatus.OK).json({
        success: true,
        message: SuccessMessage.DATA_FETCHED,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
