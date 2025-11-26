import UserManagmentPage from '@modules/admin/page/UserManagmentPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/users')({
  component: UserManagmentPage,
})
 