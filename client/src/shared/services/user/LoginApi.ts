import { LOGIN_API } from "@shared/contants"
import type { LoginType } from "@shared/types/user/LoginTypes"
import axios from "axios"

export const LoginApi = async (data: LoginType) => {
    const response = await axios.post(LOGIN_API, data, {
        headers: { "Content-Type": "application/json" }
    })

    console.log("Login response: ", response);
    return response;
}