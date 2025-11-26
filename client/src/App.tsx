import { RouterProvider } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import { Suspense } from 'react';
import { LoaderCircle } from 'lucide-react'
import { useUserStore } from '@stores/user/UserStore';
import { useAdminStore } from '@stores/admin/useAdminStore';
import { router } from './router';

const App = () => {

    const user = useUserStore();
    const admin = useAdminStore()
    const queryClient = useQueryClient()

    return (
        <Suspense fallback={<LoaderCircle />}>
            <RouterProvider router={router} context={{ user, admin, queryClient }} />
        </Suspense>
    )
}

export default App;