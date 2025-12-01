import adminApi from "@lib/axiosAdmin";

export const fetchKycUsers = async ({ page = 1, status = "PENDING" }: {
    page: number;
    status: string;
}) => {
    const res = await adminApi.get("/kyc-management",
        {
            params: { page, limit: 10, status },
        });

    return res.data.data;
};


const approveKyc = (kycId: string) =>
    adminApi.post(`/kyc-management/approve/${kycId}`);

const rejectKyc = ({ kycId, reason }: { kycId: string; reason: string }) =>
    adminApi.post(`/kyc-management/reject/${kycId}`, { reason });