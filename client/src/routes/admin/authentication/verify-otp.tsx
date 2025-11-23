  import OtpVerificationPage from '@modules/admin/page/OtpVerificationPage'
  import { useAuthStore } from '@stores/user/UserAuthStore';
  import { createFileRoute, redirect } from '@tanstack/react-router'

  export const Route = createFileRoute('/admin/authentication/verify-otp')({
    beforeLoad: () => {
      const { email, clearData, timeLeft } = useAuthStore.getState();

      if (!email) {
        clearData();
        throw redirect({
          to: '/admin/authentication',
          replace: true,
        });
      }

      const isExpired = !timeLeft || Date.now() > timeLeft;
      if (isExpired) {
        clearData();
        throw redirect({
          to: '/admin/authentication',
          replace: true,
        });
      }

    },
    component: OtpVerificationPage,
  })