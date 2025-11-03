
import { createRootRoute, Outlet, useLocation } from '@tanstack/react-router'
import { Footer } from '@shared/components/LandingPage/Footer'


const RootLayout = () => {
    const location = useLocation();
    const hideFooter = location.pathname.includes('/verify-otp');

    return <>
        <Outlet />
        {!hideFooter && <Footer />}
    </>
}

export const Route = createRootRoute({ component: RootLayout })