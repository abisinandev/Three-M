import { Container } from "inversify";
import { AdminModule } from "./moduels/admin/admin.modules";
import { AuthModule } from "./moduels/auth/auth.modules";
import { UserModule } from "./moduels/user/user.modules";

const container = new Container({
  defaultScope: "Singleton",
  autobind: true,
});

container.load(AuthModule, UserModule, AdminModule);

export { container };
