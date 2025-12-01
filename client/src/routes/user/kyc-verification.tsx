import KYCVerificationPage from '@modules/user/pages/KycVerificationPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/user/kyc-verification')({
  component: KYCVerificationPage,
})
