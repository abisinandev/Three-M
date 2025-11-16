import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useUserStore } from "@stores/user/UserStore";
import type { LoginType } from "@shared/types/user/LoginTypes";
import { LoginApi } from "@shared/services/user/LoginApi";
import type { AxiosError } from "axios";

export const useLogin = () => {
    const queryClient = useQueryClient();
    // const setUser = useUserStore((state) => state.setUser);

    return useMutation({
        mutationFn: (newUser: LoginType) => LoginApi(newUser),

        onSuccess: (res) => {
            console.log("Data:", res);
            // setUser(res);
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