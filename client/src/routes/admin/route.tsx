import AdminLayout from '@shared/layouts/admin/AdminLayout'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/admin')({
  component: Layout,
})

function Layout() {
    return <>
        <AdminLayout>
            <Outlet />
        </AdminLayout>
    </>
}
