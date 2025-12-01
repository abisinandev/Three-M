import adminApi from "@lib/axiosAdmin"

export const FetchUserKycApi = async (kycId: string) => {
    console.log("kyc: ", kycId)
    const response = await adminApi.get(`/view-kyc/${kycId}`);
    console.log("FetchUserKycApi: ", response.data)
    return response.data
}

export const approveKycApi = async (kycId: string) => {
    await adminApi.patch(`/verify-kyc/${kycId}`);
}
export const rejectKycApi = async (kycId: string, reason: string) => {
    adminApi.patch(`/reject-kyc/${kycId}`, { reason });
}