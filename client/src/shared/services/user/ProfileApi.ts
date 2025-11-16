import api from "@lib/axios";
import { LOGIN_API } from "@shared/contants"


export const ProfileApi = async () => {
    const response = await api.get(
        LOGIN_API,
        { withCredentials: true }
    )
    console.log("Get profile response: ", response);
    return response.data;
}