import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GridSettings {
  page: number;
  pageSize: number;
  search: string;
}

interface GridStoreState {
  people: GridSettings;
  films: GridSettings;
  updatePeople: (settings: Partial<GridSettings>) => void;
  updateFilms: (settings: Partial<GridSettings>) => void;
  resetPeople: () => void;
  resetFilms: () => void;
}

const defaultSettings: GridSettings = {
  page: 1,
  pageSize: 10,
  search: '',
};

export const useGridStore = create<GridStoreState>()(
  persist(
    (set) => ({
      people: { ...defaultSettings },
      films: { ...defaultSettings },
      updatePeople: (settings) => 
        set((state) => ({ people: { ...state.people, ...settings } })),
      updateFilms: (settings) => 
        set((state) => ({ films: { ...state.films, ...settings } })),
      resetPeople: () => set({ people: { ...defaultSettings } }),
      resetFilms: () => set({ films: { ...defaultSettings } }),
    }),
    {
      name: 'swapi-grid-settings',
    }
  )
);
