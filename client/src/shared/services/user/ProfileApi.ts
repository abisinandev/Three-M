import api from "@lib/axiosUser";
import { PROFILE_GET_API } from "@shared/constants/userContants";
 
export const ProfileApi = async () => {
    const response = await api.get(
        PROFILE_GET_API,
        { withCredentials: true }
    )
    return response.data;
}