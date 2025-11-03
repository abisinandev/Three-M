import mongoose from "mongoose";
import AppError from "@presentation/express/utils/error-handling/app.error";
import { env } from "@presentation/express/configs/env.constants";

const connectDB = async () => {
  if (!env.MONGO_URI) {
    throw new AppError("MONGO_URI is not defined in .env", 500);
  }

  try {
    await mongoose.connect(env.MONGO_URI!);
    console.log(`Database connected successfully✅`);
  } catch (error) {
    console.log(error);
    throw new AppError("DB connection failed", 500);
  }
};

export default connectDB;
