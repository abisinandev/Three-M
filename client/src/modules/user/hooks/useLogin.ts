import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "@stores/user/UserStore";
import type { LoginType } from "@shared/types/user/LoginTypes";
import { LoginApi } from "@shared/services/user/LoginApi";

export const useLogin = () => {
    const queryClient = useQueryClient();
    const setUser = useUserStore((state) => state.setUser);

    return useMutation({
        mutationFn: (newUser: LoginType) => LoginApi(newUser),

        onSuccess: (data) => {
            console.log(data, 'DATA')
            setUser(data.data);
            queryClient.invalidateQueries({ queryKey: ["users"] });
            console.log('Login successfull✅')
        },

        onError: (error: any) => {
            console.log(error)
            console.error("Login failed ❌", error.response?.data || error.message);
        }
    })
}