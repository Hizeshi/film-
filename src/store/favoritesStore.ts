// src/store/favoritesStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'; 
import { Movie } from '@/services/tmdbService';

interface FavoritesState {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (movie) =>
        set((state) => {
          if (!state.favorites.find(fav => fav.id === movie.id)) {
            return { favorites: [...state.favorites, movie] };
          }
          return state; 
        }),
      removeFavorite: (movieId) =>
        set((state) => ({
          favorites: state.favorites.filter((movie) => movie.id !== movieId),
        })),
      isFavorite: (movieId) => {
        const state = get();
        return state.favorites.some((movie) => movie.id === movieId);
      },
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => localStorage), 
    }
  )
);