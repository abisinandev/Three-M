import ProfileComponent from '@modules/user/components/ProfileComponent'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/profile')({
  component: ProfileComponent,
})
 
