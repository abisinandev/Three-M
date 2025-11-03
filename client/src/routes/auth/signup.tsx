import { Signup } from '@modules/user/components/SignupComponent'
import { createFileRoute } from '@tanstack/react-router'
 

export const Route = createFileRoute('/auth/signup')({
  component: Signup,
})


