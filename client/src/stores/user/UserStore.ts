import type { UserType } from '@shared/types/user/UserType';
import { create } from 'zustand';

type UserStore = {
    user: UserType | null;
    setUser: (user: UserType) => void;
    logout: () => void;
}


export const useUserStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    logout: () => set({ user: null }),
}));