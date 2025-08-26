import { create } from 'zustand';
import type { Actions, States } from './interface';

export const useCheckoutStore = create<States & Actions>((set) => ({
    availableData: null,
    updateAvailableData: (o) => set(() => ({ availableData: o })),
}));
