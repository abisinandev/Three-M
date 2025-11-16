import { useMutation } from "@tanstack/react-query";
import api from "@lib/axios";

export const useVerify2FA = () => {
    return useMutation({
        mutationFn: async ({ email, code }: { email: string; code: string }) => {
            const res = await api.post(`/auth/two-factor-verify?email=${encodeURIComponent(email)}`, { token: code });
            return res;
        },
    });
};
