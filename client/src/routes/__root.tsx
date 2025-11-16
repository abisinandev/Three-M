import { createRootRouteWithContext, Outlet, useLocation } from '@tanstack/react-router'
import type { UserType } from '@shared/types/user/UserType'

import { Footer } from '@shared/components/LandingPage/Footer'

export interface RouterContext {
  user: UserType | null
}

const RootLayout = () => {
    const location = useLocation();
    const hideFooter = location.pathname.includes('/verify-otp');

  return (
    <>
      <Outlet />
      {!hideFooter && <Footer />}
    </>
  )
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
})
