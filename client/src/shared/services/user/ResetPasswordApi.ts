import api from "@lib/axios";
import { RESET_PASSWORD } from "@shared/contants";

type Data = {
    email: string,
    resetToken: string,
    password: string,
    confirmPassword: string,
}

export const ResetPasswordApi = async (data: Data) => {
    const response = await api.post(RESET_PASSWORD, data, {
        headers: { "Content-Type": "application/json" }
    })
    console.log("Forgotpassword response: ", response);
    return response;
}