import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type FavoriteItem = {
  id: string;
  type: 'character' | 'film';
  name: string;
  subtitle: string;
  url: string;
};

interface FavoritesState {
  favorites: FavoriteItem[];
  toggleFavorite: (item: FavoriteItem) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string, type: 'character' | 'film') => boolean;
}

export const useFavorites = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (item) => {
        const { favorites } = get();
        const exists = favorites.find((f) => f.id === item.id && f.type === item.type);

        if (exists) {
          set({
            favorites: favorites.filter((f) => !(f.id === item.id && f.type === item.type)),
          });
        } else {
          set({
            favorites: [...favorites, item],
          });
        }
      },
      removeFavorite: (id) => {
        set({
          favorites: get().favorites.filter((f) => f.id !== id),
        });
      },
      isFavorite: (id, type) => {
        return get().favorites.some((f) => f.id === id && f.type === type);
      },
    }),
    {
      name: 'swapi-favorites',
    }
  )
);
