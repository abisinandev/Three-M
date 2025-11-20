 
import ForgotPasswordPage from '@modules/user/pages/ForgotPassword';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/forgot-password/')({
  component: ForgotPasswordPage,
});

 