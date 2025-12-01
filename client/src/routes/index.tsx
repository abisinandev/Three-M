import { LandingPage } from '@modules/user/components/LandingPageComponent'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: async ({ context }) => {
    if (context.user.isAuthenticated && !context.user.isBlocked) {
      throw redirect({ to: "/auth/login" })
    }
  },
  component: LandingPage,
})
