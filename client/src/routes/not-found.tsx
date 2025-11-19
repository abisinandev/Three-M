import { NotFoundRoute } from '@tanstack/react-router'
import { Route as rootRoute } from './__root'
import NotFoundPage from '@shared/components/error/NotFoundComponent'

export const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: NotFoundPage,
});