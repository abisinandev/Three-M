import { signatureUploadResponseDTO } from "@application/dto/user/signature-upload-response.dto";
import { SignatureUploadDTO } from "@application/dto/user/signature-upload.dto";

export interface ISignatureUploadUseCase {
    execute(data:SignatureUploadDTO): Promise<signatureUploadResponseDTO>
}