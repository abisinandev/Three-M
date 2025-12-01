import authRoute from "@presentation/http/routes/auth/auth.routes";
import userRoute from "@presentation/http/routes/user/user.routes";
import adminAuthRoute from "@presentation/http/routes/admin/admin-auth.routes";
import adminRoutes from "@presentation/http/routes/admin/admin.routes";
import { container } from "@infrastructure/inversify_di/inversify.di";
import { AuthMiddleware } from "@presentation/express/middlewares/auth.middleware";
import { AUTH_TYPES } from "@infrastructure/inversify_di/types/auth/auth.types";
import { Application } from "express";

export const RegisterRoutes = (app: Application) => {
  const authMiddleware = container.get<AuthMiddleware>(AUTH_TYPES.AuthMiddleware);
  
  app.use("/api/auth", authRoute);
  app.use("/api/admin/authentication", adminAuthRoute);
  app.use("/api/user", (req, res, next) => authMiddleware.handle(req, res, next), userRoute);
  app.use("/api/admin", adminRoutes);
};
