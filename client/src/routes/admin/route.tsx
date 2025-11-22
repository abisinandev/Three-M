import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/admin')({
  beforeLoad: async ({ location }) => {
    const publicPaths = ['/admin/authentication', '/admin/verify-otp']; 7

    if (publicPaths.includes(location.pathname)) {
      return <Outlet />;
    }

    const isAdmin = true;
    if (!isAdmin) {
      throw redirect({
        to: '/admin/authentication',
        search: { redirect: location.href },
      });
    }
  },
  component: () => (
    <>
      <Outlet />
    </>
  ),
});