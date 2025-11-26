import UserProfilePage from '@modules/user/pages/UserProfilePage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/user/profile')({
  // ssr:true,
  // loader: () => {
    
  // },
  component: UserProfilePage,
})
 
