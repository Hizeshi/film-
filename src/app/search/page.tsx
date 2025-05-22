// src/app/search/page.tsx
import { searchMovies, Movie } from '@/services/tmdbService';
import MovieCard from '@/components/MovieCard';
import MovieCardSkeleton from '@/components/MovieCardSkeleton';
import Link from 'next/link';

interface SearchPageProps {
  searchParams?: {
    query?: string;
    page?: string;
  };
}

export async function generateMetadata({ searchParams }: SearchPageProps) {
  const query = searchParams?.query || '';
  if (query) {
    return {
      title: `Результаты поиска: ${query} - MovieApp`,
    };
  }
  return {
    title: 'Поиск фильмов - MovieApp',
  };
}


export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams?.query || '';
  const currentPage = parseInt(searchParams?.page || '1', 10);

  if (!query.trim()) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h1 className="text-2xl font-semibold mb-6">Поиск фильмов</h1>
        <p className="text-gray-600">Пожалуйста, введите запрос в строке поиска выше.</p>
      </div>
    );
  }


  try {
    const searchResults = await searchMovies(query, currentPage);
    const movies = searchResults.results;

    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-2">
          Результаты поиска: <span className="text-blue-600">{query}</span>
        </h1>
        <p className="text-gray-600 mb-8">
          Найдено фильмов: {searchResults.total_results} (страница {searchResults.page} из {searchResults.total_pages})
        </p>

        {movies && movies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-10">
            По вашему запросу ничего не найдено. Попробуйте изменить формулировку.
          </p>
        )}

        {}
        {searchResults.total_pages > 1 && (
          <div className="mt-12 flex justify-center space-x-4">
            {searchResults.page > 1 && (
              <Link
                href={`/search?query=${encodeURIComponent(query)}&page=${searchResults.page - 1}`}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Назад
              </Link>
            )}
            {searchResults.page < searchResults.total_pages && (
              <Link
                href={`/search?query=${encodeURIComponent(query)}&page=${searchResults.page + 1}`}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Вперед
              </Link>
            )}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error(`Search failed for query "${query}":`, error);
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h1 className="text-2xl font-semibold mb-6">Ошибка поиска</h1>
        <p className="text-red-500">
          Не удалось выполнить поиск по запросу "{query}". Пожалуйста, попробуйте позже.
        </p>
      </div>
    );
  }
}