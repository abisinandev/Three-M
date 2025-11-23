import type { RefreshResponseDTO } from "@application/dto/auth/refresh-response.dto";
import type { RefreshDTO } from "@application/dto/auth/refresh.dto";

export interface IRefreshTokenUseCase{
    execute(data:RefreshDTO):Promise<RefreshResponseDTO>
}