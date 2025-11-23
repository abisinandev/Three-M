import { LandingPage } from '@modules/user/components/LandingPageComponent'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: LandingPage,
})
 