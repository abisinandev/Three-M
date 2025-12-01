import adminApi from "@lib/axiosAdmin";

export const UnblockUserApi = async (id: string) => {
    const response = await adminApi.patch(`/user/unblock/${id}`, {
        withCredentials: true,
    });

    return response.data
}