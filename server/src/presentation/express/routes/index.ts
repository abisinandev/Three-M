import { Application } from "express";
import otpRoute from "@presentation/express/routes/auth/otp-auth.routes";
import authRoute from "@presentation/express/routes/auth/auth.routes";

export const RegisterRoutes = (app: Application) => {
  const routes = [
    { path: "/api/auth", router: authRoute },
    { path: "/api/auth/2-fa", router: otpRoute },
  ];

  routes.forEach(({ path, router }) => {
    app.use(path, router);
  });
};
