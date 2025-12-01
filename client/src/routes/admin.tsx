import adminApi from '@lib/axiosAdmin';
import NotFoundPage from '@shared/components/error/NotFoundComponent';
import { PROFILE_URL } from '@shared/constants/adminConstants';
import AdminLayout from '@shared/layouts/admin/AdminLayout'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/admin')({
    beforeLoad: async ({ context }) => {
        try {
            const { data } = await adminApi.get(PROFILE_URL);
            context.admin.setData(data);
        } catch (error) {
            throw redirect({ to: "/admin/authentication" })
        }
    },
    notFoundComponent: () => <NotFoundPage />,
    component: Layout,
})

function Layout() {
    return <>
        <AdminLayout>
            <Outlet />
        </AdminLayout>
    </>
}
