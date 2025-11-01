import { env } from "@presentation/express/configs/env.constants";
import connectDB from "@infrastructure/databases/mongo_db/mongo.db";
import app from "./app";

const bootstrap = async () => {
  try {
    await connectDB();

    app.listen(env.PORT, () => {
      console.log(`Server running on PORT: ${env.PORT}`);
    });
  } catch (error) {
    console.error("❌ Server startup failed:", error);
    process.exit(1);
  }
};

bootstrap();
