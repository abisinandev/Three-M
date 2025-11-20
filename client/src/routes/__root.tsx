import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import type { UserType } from '@shared/types/user/UserType'
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export interface RouterContext {
  user: UserType | null
}

const RootLayout = () => {

  return (
    <div className="min-h-screen flex flex-col">
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  )
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
})
