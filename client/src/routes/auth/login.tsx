import LoginComponent from '@modules/user/components/LoginComponent'
import { useUserStore } from '@stores/user/UserStore';
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/login')({
  beforeLoad: () => {
    const user = useUserStore.getState().user;
    if (user) {
      throw redirect({ to: "/profile" });
    }
  },
  component: LoginComponent,
})

