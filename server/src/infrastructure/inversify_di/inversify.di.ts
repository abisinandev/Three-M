import { Container } from "inversify";
import { AuthModule } from "./moduels/auth/auth.modules";
import { UserModule } from "./moduels/user/user.modules";
import { LoggerModule } from "./moduels/express/logger.modules";

const container = new Container({
  defaultScope: "Singleton",
  autobind: true,
});

container.load(
  AuthModule,
  UserModule,
  LoggerModule
);

export { container };
