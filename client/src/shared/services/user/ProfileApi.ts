import api from "@lib/axiosUser";
import { LOGIN_API } from "@shared/constants/userContants"


export const ProfileApi = async () => {
    const response = await api.get(
        LOGIN_API,
        { withCredentials: true }
    )
    console.log("Get profile response: ", response);
    return response.data;
}