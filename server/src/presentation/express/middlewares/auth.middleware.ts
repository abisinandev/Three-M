import type { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../utils/error-handling";
import jwt from 'jsonwebtoken';
import { env } from "../utils/constants/env.constants";
import type { JwtPayload } from "@domain/types/jwt-payload.type";

export const AuthMiddleware = ((req: Request, res: Response, next: NextFunction) => {
    try {
        const { accessToken } = req.cookies;

        if (!accessToken) {
            throw new UnauthorizedError("Unauthorized access");
        }

        const decoded = jwt.verify(accessToken, env.ACCESS_SECRET) as JwtPayload;
        
        if (!decoded.isBlocked) {
            res.clearCookie("accessToken", { httpOnly: true, sameSite: "lax" });
            res.clearCookie("refreshToken", { httpOnly: true, sameSite: "lax" });
        }
        
        req.user = decoded;

        next();
    } catch (error) {
        next(error)
    }
})