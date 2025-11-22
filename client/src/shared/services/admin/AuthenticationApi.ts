import adminApi from "@lib/axiosAdmin";
import { AUTHENTICATION } from "@shared/constants/adminConstants";
import type { AuthTypes } from "@shared/types/admin/AuthTypes";

export const AuthenticationApi = async (data: AuthTypes) => {
    const response = await adminApi.post(AUTHENTICATION, data, {
        headers: { "Content-Type": "application/json" }
    })
    console.log("Authencation response: ", response);
    return response;
}