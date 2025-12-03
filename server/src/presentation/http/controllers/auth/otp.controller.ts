// import { VerifyOtpDTO } from "@application/dto/auth/verify-otp.dto";
// import type { IBaseUseCase } from "@application/use_cases/interfaces/base-usecase.interface";
// import { HttpStatus } from "@domain/enum/express/status-code";
// import { AUTH_TYPES } from "@infrastructure/inversify_di/types/auth/auth.types";
// import type { NextFunction, Request, Response } from "express";
// import { inject, injectable } from "inversify";

// @injectable()
// export class OtpController {

//     constructor(
//         @inject(AUTH_TYPES.SignupVerifyOtpUseCase) private readonly _verifyOtpUseCase: IBaseUseCase<VerifyOtpDTO, { message: string }>,
//         @inject(AUTH_TYPES.ResendOtpUseCase) private readonly _resendOtpUseCase: IBaseUseCase<{ email: string }, { message: string }>
//     ) { }

//     async verifyOtp(req: Request, res: Response, next: NextFunction): Promise<void> {
//         try {
//             const response = await this._verifyOtpUseCase.execute(req.body);
//             res.status(HttpStatus.OK).json(response);

//         } catch (err) {
//             next(err)
//         }
//     }

//     async resendOtp(req: Request, res: Response, next: NextFunction) {
//         try {
//             const { email } = req.body;
//             const response = await this._resendOtpUseCase.execute(email)
//             res.status(HttpStatus.OK).json(response)
//         } catch (err) {
//             next(err)
//         }
//     }
// }
