// src/app/movies/page.tsx
import { getPopularMovies } from '@/services/tmdbService';
import MovieCard from '@/components/MovieCard';
import MovieCardSkeleton from '@/components/MovieCardSkeleton'; 
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Популярные фильмы - MovieApp',
};

export default async function MoviesPage() {
  try {

    const popularMoviesData = await getPopularMovies();
    const movies = popularMoviesData.results;

    if (!movies || movies.length === 0) {
      return (
        <div>
          <h1 className="text-3xl font-bold mb-8 text-center md:text-left">Популярные фильмы</h1>
          <p className="text-center text-gray-600">Фильмы не найдены или не удалось загрузить.</p>
        </div>
      );
    }

    return (
      <div>
        <h1 className="text-3xl font-bold mb-8 text-center md:text-left">Популярные фильмы</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        {}
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch popular movies:", error);
    return (
      <div>
        <h1 className="text-3xl font-bold mb-8 text-center md:text-left">Популярные фильмы</h1>
        <p className="text-red-500 text-center mt-10">Ошибка загрузки фильмов. Пожалуйста, попробуйте позже.</p>
      </div>
    );
  }
}