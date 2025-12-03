import type { ITwoFactorAuthVerify } from "@application/interfaces/services/externals/2fa-auth-verify.interface";
import { injectable } from "inversify";
import { authenticator } from "otplib";

@injectable()
export class TwoFactorAuthVerify implements ITwoFactorAuthVerify {
  async verify(secret: string, token: string): Promise<boolean> {
    const Token = token.trim();
    if (!/^\d{6}$/.test(Token)) return false;
    return await authenticator.verify({ secret, token: Token });
  }
}
