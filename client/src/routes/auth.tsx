import AuthLayout from '@shared/layouts/auth/AuthLayout'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { useUserStore } from '@stores/user/UserStore'

export const Route = createFileRoute('/auth')({
    beforeLoad: () => {
        const { isAuthenticated } = useUserStore.getState()
        if (isAuthenticated) {
            throw redirect({ to: '/user' })
        }
    },
    component: AuthLayout,
})