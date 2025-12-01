import adminApi from "@lib/axiosAdmin";

export const BlockUserDataApi = async (id: string) => {
    const response = await adminApi.patch(`/user/block/${id}`, {
        withCredentials: true,
    });

    return response.data
}