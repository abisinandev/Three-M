import LoginComponent from '@modules/user/components/LoginComponent'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/login')({
  component: LoginComponent,
})

