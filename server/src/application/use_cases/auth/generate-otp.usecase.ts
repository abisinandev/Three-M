import { IEmailService } from "@application/interfaces/services/email.service.interface";
import { IOtpRepository } from "@application/interfaces/repositories/otp-repository.interface";

import { inject, injectable } from "inversify";
import { AUTH_TYPES } from "@infrastructure/inversify_di/types/auth/auth.types";
import { OtpDTO } from "@application/dto/auth-dto/send-otp.dto";

@injectable()
export class GenerateOtpUseCase { //IBaseUseCase not implemented;📌📌📌

    constructor(
        @inject(AUTH_TYPES.IOtpRepository) private _otpRepository: IOtpRepository,
        @inject(AUTH_TYPES.IEmailService) private readonly _emailServiceRepository: IEmailService
    ) { }

    async execute(email: string) {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await this._emailServiceRepository.sendOtpEmail(email, otp)

        const exists = await this._otpRepository.getOtp(email);
        console.log('exists otp ',exists)
        // let savedOtp;
        if (exists?.email) {
            return await this._otpRepository.updateResendInfo(email, otp.toString())
        } else {
            return await this._otpRepository.saveOtp(email, otp, 300);
        }

        // console.log('GenrateOtpUsecase : ', savedOtp)
        // return savedOtp;
    }
} 