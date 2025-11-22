import authRoute from "@presentation/http/routes/auth/auth.routes";
import userRoute from "@presentation/http/routes/user/user.routes";
import adminRoute from "@presentation/http/routes/admin/admin-auth.routes";
import type { Application } from "express";

export const RegisterRoutes = (app: Application) => {
  const routes = [
    { path: "/api/auth", router: authRoute },
    { path: "/api/user", router: userRoute },
    { path: "/api/admin", router: adminRoute },
  ];

  routes.forEach(({ path, router }) => {
    app.use(path, router);
  });
};
