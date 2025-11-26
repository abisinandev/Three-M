import adminApi from "@lib/axiosAdmin";

export const BlockUserDataApi = async (id: string) => {
    const response = await adminApi.get(`/user/block/${id}`, {
        withCredentials: true,
    });

    return response.data
}