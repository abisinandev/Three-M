import adminApi from "@lib/axiosAdmin";

export const UnblockUserApi = async (id: string) => {
    const response = await adminApi.get(`/user/unblock/${id}`, {
        withCredentials: true,
    });

    return response.data
}