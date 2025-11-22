import OtpVerificationPage from '@modules/admin/page/OtpVerificationPage'
import { useAuthStore } from '@stores/user/UserAuthStore';
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/authentication/verify-otp')({
  beforeLoad: () => {
    const { email, clearData, timeLeft } = useAuthStore.getState();
    
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const isPageRefresh = navigationEntry?.type === 'reload';
    const isExpired = !timeLeft || Date.now() > timeLeft;
    if (isPageRefresh || !email || isExpired) {
      clearData();
      throw redirect({
        to: '/admin/authentication',
        replace: true,
      });
    }
  },
  component: OtpVerificationPage,
})
