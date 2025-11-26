import { createRouter } from '@tanstack/react-router';
import { QueryClient } from '@tanstack/react-query';
import NotFoundPage from '@shared/components/error/NotFoundComponent';
import { routeTree } from './routeTree.gen';
import { useUserStore } from '@stores/user/UserStore';
import { useAdminStore } from '@stores/admin/useAdminStore';

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router,
    }
}

export const router = createRouter({
  defaultNotFoundComponent: NotFoundPage,
  routeTree,
  context: {
    user: useUserStore.getState(),
    admin: useAdminStore.getState(),
    queryClient: new QueryClient(),
  },
});