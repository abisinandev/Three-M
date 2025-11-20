import api from "@lib/axios";
import { CHANGE_PASSWORD } from "@shared/contants";

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