import { env } from "@presentation/express/configs/env.constants";
import Redis from "ioredis";

export const redisClient = new Redis({
  host: "localhost",
  port: Number(env.REDIS_PORT),
  db: 0,
});

redisClient.on("connect", () => console.log("Redis connected✅"));
redisClient.on("error", (err) => console.error("Redis error:", err));
