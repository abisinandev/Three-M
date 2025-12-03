import AuthLayout from '@shared/layouts/auth/AuthLayout'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/auth')({
    beforeLoad: ({ context }) => {
        if (context.user.isAuthenticated && !context.user.isBlocked) {
            throw redirect({ to: "/user" })
        }
    },
    component: AuthLayout,
})