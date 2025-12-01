import { inject, injectable } from "inversify";
import { ISignatureUploadUseCase } from "../interfaces/user/signature-upload-usecase.interface";
import { SignatureUploadDTO } from "@application/dto/user/signature-upload.dto";
import { USER_TYPES } from "@infrastructure/inversify_di/types/user/user.types";
import { IStorageProvider } from "@application/interfaces/services/externals/storage-provider.interface";
import { signatureUploadResponseDTO } from "@application/dto/user/signature-upload-response.dto";

@injectable()
export class SignatureUploadUseCase implements ISignatureUploadUseCase {
    constructor(
        @inject(USER_TYPES.CloudinaryStorageProvider) private readonly _cloudinaryStorage: IStorageProvider,
    ) { }

    async execute(data: SignatureUploadDTO): Promise<signatureUploadResponseDTO> {
        return await this._cloudinaryStorage.getSignedUploadUrl(data.folder, data.userId);
    }
}