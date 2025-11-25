import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner'
import { routeTree } from './routeTree.gen';
import './index.css'
import NotFoundPage from '@shared/components/error/NotFoundComponent';
import { GoogleOAuthProvider } from '@react-oauth/google';

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFoundPage,
  context: {
    user: null
  },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const queryClient = new QueryClient();

const GOOGLE_CLIENT_ID = "174964162025-6n0gs131g7ttl1sugliglc6ggcimi4j0.apps.googleusercontent.com";

if (!GOOGLE_CLIENT_ID) {
  console.error("VITE_GOOGLE_CLIENT_ID is not set. Google Login will not work.");
}

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <Toaster position="top-center" richColors />
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </StrictMode>
  )
}