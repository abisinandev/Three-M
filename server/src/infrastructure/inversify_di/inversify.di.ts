import { Container } from "inversify";
import { AuthModule } from "./moduels/auth/auth.modules";
import { UserModule } from "./moduels/user/user.modules";

const container = new Container({
  defaultScope: "Singleton",
  autobind: true,
});

container.load(AuthModule, UserModule);

export { container };
