import type { SignatureUploadDTO } from "@application/dto/user/signature-upload.dto";
import type { signatureUploadResponseDTO } from "@application/dto/user/signature-upload-response.dto";
import type { IStorageProvider } from "@application/interfaces/services/externals/storage-provider.interface";
import { USER_TYPES } from "@infrastructure/inversify_di/types/user/user.types";
import { inject, injectable } from "inversify";
import type { ISignatureUploadUseCase } from "../interfaces/user/signature-upload-usecase.interface";

@injectable()
export class SignatureUploadUseCase implements ISignatureUploadUseCase {
  constructor(
    @inject(USER_TYPES.CloudinaryStorageProvider) private readonly _cloudinaryStorage: IStorageProvider,
  ) {}

  async execute(data: SignatureUploadDTO): Promise<signatureUploadResponseDTO> {
    return await this._cloudinaryStorage.getSignedUploadUrl(
      data.folder,
      data.userId,
    );
  }
}
