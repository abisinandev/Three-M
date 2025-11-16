import api from "@lib/axios";
import { LOGIN_API } from "@shared/contants"
import type { LoginType } from "@shared/types/user/LoginTypes"


export const LoginApi = async (data: LoginType) => {
    const response = await api.post(LOGIN_API, data, {
        headers: { "Content-Type": "application/json" }
    })
    console.log("Login response: ", response);
    return response.data;
}