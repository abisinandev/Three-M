import authRoute from "@presentation/http/routes/auth/auth.routes";
import otpRoute from "@presentation/http/routes/auth/otp-auth.routes";
import userRoute from "@presentation/http/routes/user/user.routes";
import type { Application } from "express";

export const RegisterRoutes = (app: Application) => {
  const routes = [
    { path: "/api/auth", router: authRoute },
    { path: "/api/auth/2-fa", router: otpRoute },
    { path: "/api/user", router: userRoute },
  ];

  routes.forEach(({ path, router }) => {
    app.use(path, router);
  });
};
