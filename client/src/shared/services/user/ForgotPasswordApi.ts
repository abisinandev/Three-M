import api from "@lib/axios";
import { FORGOT_PASSWORD } from "@shared/contants";

export const ForgotPasswordApi = async (data: { email: string }) => {
    const response = await api.post(FORGOT_PASSWORD, data, {
        headers: { "Content-Type": "application/json" }
    })
    console.log("Forgotpassword response: ", response);
    return response;
}