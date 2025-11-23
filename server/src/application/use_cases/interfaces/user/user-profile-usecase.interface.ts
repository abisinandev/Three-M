import type { ResponseUserDTO } from "@application/dto/auth/response-user.dto";

export interface IUserProfileInterface {
    execute(data: { userId: string }): Promise<ResponseUserDTO>
}