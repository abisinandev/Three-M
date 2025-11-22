import api from "@lib/axiosUser";
import { CHANGE_PASSWORD } from "@shared/constants/userContants";

export const ChangePasswordApi = async (data: {
    currentPassword: string,
    newPassword: string,
    confirmPassword: string,
}) => {
    const response = await api.post(CHANGE_PASSWORD, data, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
    })
    console.log("Forgotpassword response: ", response);
    return response;
}