import api from '@lib/axiosUser';
import { PROFILE_GET_API } from '@shared/constants/userContants';
import UserLayout from '@shared/layouts/user/UserLayout';
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/user')({
    beforeLoad: async ({context}) => {
        try {
            const { data } = await api.get(PROFILE_GET_API, { withCredentials: true });    

            if (!data) {
                throw redirect({ to: "/auth/login" })
            }

            context.user.setUser(data);

        } catch (error) {
            throw redirect({ to: "/auth/login" })
        }
    },
    component: UserLayout,
})

