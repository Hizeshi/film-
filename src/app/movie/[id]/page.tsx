// src/app/movie/[id]/page.tsx
import { getMovieDetails, Movie } from '@/services/tmdbService'; 
import Image from 'next/image'; 
import type { Metadata, ResolvingMetadata } from 'next';

interface MovieDetailPageProps {
  params: {
    id: string; 
  };
}

export async function generateMetadata(
  { params }: MovieDetailPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = parseInt(params.id, 10);
  try {
    const movie = await getMovieDetails(id);
    return {
      title: `${movie.title} - MovieApp`,
      description: movie.overview.substring(0, 160), 
    };
  } catch (error) {
    console.error("Failed to fetch movie details for metadata:", error);
    return {
      title: 'Фильм не найден - MovieApp',
    };
  }
}


export default async function MovieDetailPage({ params }: MovieDetailPageProps) {
  const movieId = parseInt(params.id, 10);

  if (isNaN(movieId)) {
    return <p className="text-red-500 text-center mt-10">Некорректный ID фильма.</p>;
  }

  try {
    const movie = await getMovieDetails(movieId);

    if (!movie) {
      return <p className="text-red-500 text-center mt-10">Фильм не найден.</p>;
    }

    const posterUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w780${movie.poster_path}` 
      : '/photo_2025-05-21_17-50-20.jpg';

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
            <h1 className="text-4xl font-bold mb-3">{movie.title}</h1>
            <div className="flex items-center mb-4 text-gray-600">
              <span className="mr-4">
                Год: {new Date(movie.release_date).getFullYear()}
              </span>
              <span className="flex items-center">
                <svg className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                {movie.vote_average > 0 ? movie.vote_average.toFixed(1) : 'N/A'}
              </span>
            </div>
            
            <h2 className="text-2xl font-semibold mb-2 mt-6">Описание</h2>
            <p className="text-gray-700 leading-relaxed">
              {movie.overview || 'Описание отсутствует.'}
            </p>

            {}
            <div className="mt-8">
              {}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error(`Failed to fetch movie details for ID ${movieId}:`, error);
    return <p className="text-red-500 text-center mt-10">Не удалось загрузить информацию о фильме. Возможно, фильм не найден.</p>;
  }
}