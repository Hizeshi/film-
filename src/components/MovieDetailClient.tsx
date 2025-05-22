// src/components/MovieDetailClient.tsx
'use client';

import { Movie, Video } from '@/services/tmdbService';
import { useFavoritesStore } from '@/store/favoritesStore';
import Image from 'next/image';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
import { useEffect, useState, useRef } from 'react';

interface MovieDetailClientProps {
  movie: Movie;
  trailer: Video | null;
}

export default function MovieDetailClient({ movie, trailer }: MovieDetailClientProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
  const [isFav, setIsFav] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [trailerHeight, setTrailerHeight] = useState(395);
  const isResizing = useRef(false);
  const startY = useRef(0);
  const startHeight = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    isResizing.current = true;
    startY.current = e.clientY;
    startHeight.current = trailerHeight;
    document.body.style.cursor = 'ns-resize';
    document.body.style.userSelect = 'none';
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing.current) return;
      const deltaY = e.clientY - startY.current;
      const newHeight = Math.max(200, startHeight.current + deltaY);
      setTrailerHeight(newHeight);
    };

    const handleMouseUp = () => {
      isResizing.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [trailerHeight]);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  useEffect(() => {
    if (isMounted) {
      setIsFav(isFavorite(movie.id));

      const unsubscribe = useFavoritesStore.subscribe((state) => {
        const currentIsFav = state.favorites.some(favMovie => favMovie.id === movie.id);
        setIsFav(currentIsFav);
      });
      return unsubscribe;
    }
  }, [isMounted, isFavorite, movie.id]);

  const handleFavoriteToggle = () => {
    if (isFav) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w780${movie.poster_path}`
    : '/photo_2024-10-25_17-27-05.jpg';

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="md:flex md:space-x-8">
        <div className="md:w-1/3 mb-6 md:mb-0">
          <Image
            src={posterUrl}
            alt={`Постер фильма ${movie.title}`}
            width={780}
            height={1170}
            className="rounded-lg shadow-xl object-cover w-full"
            priority
          />
        </div>
        <div className="md:w-2/3">
          <div className="flex justify-between items-start mb-3">
            <h1 className="text-3xl lg:text-4xl font-bold mr-4">{movie.title}</h1>
            {isMounted && (
              <button
                onClick={handleFavoriteToggle}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ml-auto flex-shrink-0"
                title={isFav ? 'Удалить из избранного' : 'Добавить в избранное'}
                aria-label={isFav ? 'Удалить из избранного' : 'Добавить в избранное'}
              >
                {isFav ? (
                  <StarIconSolid className="w-7 h-7 lg:w-8 lg:h-8 text-yellow-400" />
                ) : (
                  <StarIconOutline className="w-7 h-7 lg:w-8 lg:h-8 text-gray-500 dark:text-gray-400" />
                )}
              </button>
            )}
          </div>

          <div className="flex items-center mb-4 text-gray-600 dark:text-gray-400">
            <span className="mr-4">
              Год: {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
            </span>
            <span className="flex items-center">
              <svg className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              {movie.vote_average > 0 ? movie.vote_average.toFixed(1) : 'N/A'}
            </span>
          </div>
          
          <h2 className="text-xl lg:text-2xl font-semibold mb-2 mt-6">Описание</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {movie.overview || 'Описание отсутствует.'}
          </p>

          {trailer && (
            <div className="mt-8">
              <h2 className="text-xl lg:text-2xl font-semibold mb-3">Трейлер</h2>
              <div className="relative rounded-lg overflow-hidden shadow-lg bg-black" style={{ height: `${trailerHeight}px` }}>
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.key}?autoplay=0&rel=0`}
                  title={trailer.name || "Трейлер фильма"}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
                <div
                  className="absolute bottom-0 left-0 right-0 h-4 cursor-ns-resize hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center"
                  onMouseDown={handleMouseDown}
                >
                  <div className="w-12 h-1 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
                </div>
              </div>
            </div>
          )}

          {}
          {
}
        </div>
      </div>
    </div>
  );
}