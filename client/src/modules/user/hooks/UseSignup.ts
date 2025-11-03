import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SignupApi } from "@shared/services/user/SignupApi";
import { useUserStore } from "@stores/user/UserStore";
import type { SignupType } from "@shared/types/user/SignupTypes";
 

export const useSignup = () => {
    const queryClient = useQueryClient();
    const setUser = useUserStore((state) => state.setUser);

    return useMutation({
        mutationFn: (newUser: SignupType) => SignupApi(newUser),

        onSuccess: (res) => {
            setUser(res.data);
            queryClient.invalidateQueries({ queryKey: ["users"] });
            console.log('Signup successfull✅')
        },

        onError: (error: any) => {
            console.log(error)
            console.error("Signup failed ❌", error.response?.data || error.message);
        }
    })
}