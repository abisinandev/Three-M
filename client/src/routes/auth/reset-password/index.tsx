import ResetPasswordPage from '@modules/user/pages/ResetPasswordPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/reset-password/')({
  component: ResetPasswordPage,
  // validateSearch: (search: Record<string, unknown>) => {
  //   return {
  //     email: (search.email as string) ?? null,
  //     token: (search.token as string) ?? null,
  //   }
  // }
})


