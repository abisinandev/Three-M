import adminApi from "@lib/axiosAdmin"

export const fetchKycUsers = async ({ page = 1, status = "pending" }: {
    page: number;
    status: string;
}) => {
    const res = await adminApi.get("/kyc-management",
        {
            params: { page, limit: 10, status },
        });

    return res.data.data;
};

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