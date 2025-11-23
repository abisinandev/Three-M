import AdminDashboard from '@modules/admin/page/DashboardPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/dashboard/')({
  component: AdminDashboard,
})
 
