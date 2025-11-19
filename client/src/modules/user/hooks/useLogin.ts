import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { LoginType } from "@shared/types/user/LoginTypes";
import { LoginApi } from "@shared/services/user/LoginApi";
import type { AxiosError } from "axios";

export const useLogin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newUser: LoginType) => LoginApi(newUser),

        onSuccess: (res) => {
            console.log("Data:", res);
            queryClient.invalidateQueries({ queryKey: ["users"] });
            console.log("Login successful ✅");
        },

        onError: (error: unknown) => {
            const axiosError = error as AxiosError<any>;
            console.error(
                "Login failed ❌",
                axiosError.response?.data || axiosError.message
            );
        }
    })
}