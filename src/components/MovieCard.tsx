// src/components/MovieCard.tsx
'use client'; 

import Link from 'next/link';
import Image from 'next/image'; 
import { Movie } from '@/services/tmdbService';
import { useFavoritesStore } from '@/store/favoritesStore';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const { addFavorite, removeFavorite, isFavorite: checkIsFavoriteInStore } = useFavoritesStore(); 
  const [isFav, setIsFav] = useState(false);
  const [isMounted, setIsMounted] = useState(false); 

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      setIsFav(checkIsFavoriteInStore(movie.id));

      const unsubscribe = useFavoritesStore.subscribe((state) => {
        const isFavorite = state.favorites.some(favMovie => favMovie.id === movie.id);
        setIsFav(isFavorite);
      });
      return unsubscribe;
    }
  }, [isMounted, checkIsFavoriteInStore, movie.id]);


  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/photo_2024-10-25_17-27-05.jpg';

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    if (isFav) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
    setIsFav(!isFav); 
  };

  return (
    <div className="group relative border rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white transform hover:-translate-y-1">
      <Link
        href={`/movie/${movie.id}`}
        className="block"
        aria-label={`Подробнее о фильме ${movie.title}`}
      >
        <div className="relative">
          <Image
            src={imageUrl}
            alt={`Постер фильма ${movie.title}`}
            width={500}
            height={750}
            className="w-full h-auto object-cover aspect-[2/3]"
            priority={false} 
          />
        </div>
        <div className="p-3">
          <h3 className="text-md font-semibold mb-1 truncate text-black" title={movie.title}>
            {movie.title}
          </h3>
          <p className="text-xs text-gray-600 mb-1">
            {new Date(movie.release_date).getFullYear()}
          </p>
          <div className="flex items-center text-sm text-gray-700 font-semibold">
            <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            {movie.vote_average > 0 ? movie.vote_average.toFixed(1) : 'N/A'}
          </div>
        </div>
      </Link>
      {}
      <button
        onClick={handleFavoriteToggle}
        className="absolute top-2 right-2 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-75 transition-colors z-10"
        aria-label={isFav ? 'Удалить из избранного' : 'Добавить в избранное'}
        title={isFav ? 'Удалить из избранного' : 'Добавить в избранное'}
      >
        {isFav ? (
          <StarIconSolid className="w-5 h-5 text-yellow-400" />
        ) : (
          <StarIconOutline className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}