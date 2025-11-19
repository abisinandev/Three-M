import { ForgotPasswordApi } from "@shared/services/user/ForgotPasswordApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export const useForgotPassword = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (data: { email: string }) => ForgotPasswordApi(data),

        onSuccess: (res) => {
            console.log("Data forgot password: ", res);
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },

        onError: (error: unknown) => {
            const axiosError = error as AxiosError<any>;
            console.error(
                axiosError.response?.data || axiosError.message
            );
        }
    })
}