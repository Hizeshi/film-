// src/app/favorites/page.tsx
'use client';

import { useFavoritesStore } from '@/store/favoritesStore';
import MovieCard from '@/components/MovieCard';
import Link from 'next/link';
import type { Metadata } from 'next'; 
import { useEffect, useState } from 'react';

export default function FavoritesPage() {
  const { favorites } = useFavoritesStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    document.title = 'Избранные фильмы - MovieApp';
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-8 text-center md:text-left">Избранные фильмы</h1>
        <p className="text-center">Загрузка избранных фильмов...</p>
        {}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-6">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="border rounded-lg shadow-lg bg-white animate-pulse">
              <div className="w-full bg-gray-300 aspect-[2/3]"></div>
              <div className="p-3">
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-8 text-center md:text-left">Избранные фильмы</h1>
        <p className="text-center text-gray-600">
          У вас пока нет избранных фильмов.
          <br />
          Вы можете добавить их со страницы{' '}
          <Link href="/movies" className="text-blue-600 hover:underline">
            популярных фильмов
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-center md:text-left">Избранные фильмы</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-6">
        {favorites.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}