import { RefreshResponseDTO } from "@application/dto/auth/refresh-response.dto";
import { RefreshDTO } from "@application/dto/auth/refresh.dto";

export interface IRefreshTokenUseCase {
    execute(data: RefreshDTO): Promise<RefreshResponseDTO>;
}