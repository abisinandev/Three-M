import authRoute from "@presentation/http/routes/auth/auth.routes";
import userRoute from "@presentation/http/routes/user/user.routes";
import adminAuthRoute from "@presentation/http/routes/admin/admin-auth.routes";
import adminRoutes from "@presentation/http/routes/admin/admin.routes";

import type { Application } from "express";

export const RegisterRoutes = (app: Application) => {
  const routes = [
    { path: "/api/auth", router: authRoute },
    { path: "/api/user", router: userRoute },
    { path: "/api/admin/authentication", router: adminAuthRoute },
    { path: "/api/admin", router: adminRoutes }
  ];

  routes.forEach(({ path, router }) => {
    app.use(path, router);
  });
};
