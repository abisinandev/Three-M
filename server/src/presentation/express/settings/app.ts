import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import { env } from "@presentation/express/configs/env.constants";
import cors from "cors";
import { ErrorMiddleware } from "@presentation/express/middlewares/error-middleware";
import { RegisterRoutes } from "@presentation/express/routes";

const app = express();

//middlewares configs
app.use(morgan("dev"));
app.use((req, res, next) => {
  console.log("running", req.method, req.originalUrl);
  next();
});
app.use(cors({ origin: env.FRONTEND_URL }));
app.use(express.json());

//protected routes
RegisterRoutes(app);

//AppError middleware
app.use(ErrorMiddleware.execute);

export default app;
