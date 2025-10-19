import { NextFunction, Request, Response } from "express";
import { UserSignupUseCase } from "../../../application/useCases/auth/userSignupUseCase";
import { User } from "../../../domain/entities/User";
import AppError from "../../../shared/errors/appError";
import { SignUpSchema } from "../../../application/validator/AuthValidator";
import { ZodError } from "zod";

export class SignupController {
    constructor(private userSignupUseCase: UserSignupUseCase) { }

    async signup(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {

            //Validation request using Zod
            const paresedData = SignUpSchema.parse(req.body)
            const user = new User(
                paresedData.fullName,
                paresedData.email,
                paresedData.phone,
                paresedData.password
            )
            const response = await this.userSignupUseCase.execute(user)
            return res.status(201).json(response)

        } catch (err: unknown) {

            if (err instanceof ZodError) {

                const errorMsg = err.issues.map((issue: any) => {
                    return { message: `${issue.path.join(".")} is ${issue.message}` }
                })
                console.log("Validation error : ", errorMsg)
                return res.status(400).json({ status: false, error: `Invalid data`, details: errorMsg })

            } else if (err instanceof AppError) {
                throw new AppError(err.message, err.statusCode)
            } else {
                throw new AppError('Internal Server Error', 500)
            }
        }
    }
}