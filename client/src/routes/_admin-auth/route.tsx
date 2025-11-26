import { createFileRoute, redirect, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_admin-auth')({
    beforeLoad: async ({ location }) => {
        const publicPathPrefix = '/admin/authentication';

        if (location.pathname.startsWith(publicPathPrefix)) {
            return;
        }

        const isAdmin = true; 
        
        if (!isAdmin) {
            throw redirect({
                to: publicPathPrefix,
                search: { from: location.pathname }, 
            });
        }
    },
    component: () => (
        <>
            <Outlet />
        </>
    ),
});