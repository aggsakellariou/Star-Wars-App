import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ApiStoreState {
  primaryApiLastFailure: number;
  hasShownBackupToast: boolean;
  setFailureTime: (time: number) => void;
  setShownBackupToast: (shown: boolean) => void;
  reset: () => void;
}

export const useApiStore = create<ApiStoreState>()(
  persist(
    (set) => ({
      primaryApiLastFailure: 0,
      hasShownBackupToast: false,
      setFailureTime: (time) => set({ primaryApiLastFailure: time }),
      setShownBackupToast: (shown) => set({ hasShownBackupToast: shown }),
      reset: () => set({ primaryApiLastFailure: 0, hasShownBackupToast: false }),
    }),
    {
      name: 'swapi-api-config',
    }
  )
);
