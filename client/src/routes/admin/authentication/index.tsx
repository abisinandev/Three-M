import AuthenticationPage from '@modules/admin/page/AuthenticationPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/authentication/')({
  component: AuthenticationPage,
})

 