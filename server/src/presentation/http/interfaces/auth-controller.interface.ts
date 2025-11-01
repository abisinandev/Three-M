import { Request, Response } from "express";
export interface IAuthSignupController {
  signup(req: Request, res: Response): Promise<Response | void>;

  verifyOtp(req: Request, res: Response): Promise<void>;
}
