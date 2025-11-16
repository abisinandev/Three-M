 import { useUserStore } from '@stores/user/UserStore';
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/_auth')({
  beforeLoad: () => {
    const user = useUserStore.getState().user;
    if (!user) throw redirect({ to: '/auth/login' });
  },
});