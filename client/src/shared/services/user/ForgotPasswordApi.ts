import api from "@lib/axiosUser";
import { FORGOT_PASSWORD } from "@shared/constants/userContants";

export const ForgotPasswordApi = async (data: { email: string }) => {
    const response = await api.post(FORGOT_PASSWORD, data, {
        headers: { "Content-Type": "application/json" }
    })
    console.log("Forgotpassword response: ", response);
    return response;
}