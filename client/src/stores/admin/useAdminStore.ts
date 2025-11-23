
import type { AdminType } from '@shared/types/admin/AdminTypes';
import { create } from 'zustand';

type AdminStore = {
    data: AdminType | null;
    setData: (data: AdminType) => void;
    logout: () => void;
}


export const useAdminStore = create<AdminStore>((set) => ({
    data: null,
    setData: (data) => set({ data }),
    logout: () => set({ data: null }),
}));