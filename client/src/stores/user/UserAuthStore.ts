import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
    pendingEmail: string | null;
    setPendingEmail: (email: string) => void;
    clearPendingEmail: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            pendingEmail: null,
            setPendingEmail: (email) => set({ pendingEmail: email }),
            clearPendingEmail: () => set({ pendingEmail: null }),
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({ pendingEmail: state.pendingEmail }),
        }
    )
)