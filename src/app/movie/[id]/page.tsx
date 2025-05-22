// src/app/movie/[id]/page.tsx
import { getMovieDetails, Movie, Video } from '@/services/tmdbService';
import MovieDetailClient from '@/components/MovieDetailClient';
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

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
  if (isNaN(id)) {
    return { title: 'Ошибка - MovieApp' };
  }
  try {
    const movie = await getMovieDetails(id);
    return {
      title: `${movie.title} - MovieApp`,
      description: movie.overview?.substring(0, 160) || 'Подробная информация о фильме.',
    };
  } catch (error) {
    return {
      title: 'Фильм не найден - MovieApp',
    };
  }
}

export default async function MovieDetailPage({ params }: MovieDetailPageProps) {
  const movieId = parseInt(params.id, 10);

  if (isNaN(movieId)) {
    notFound();
  }

  try {
    const movie = await getMovieDetails(movieId);
    const officialTrailer = (movie as any)?.videos?.results?.find(
      (video: Video) => video.site === 'YouTube' && video.type === 'Trailer'
    ) || (movie as any)?.videos?.results?.find(
      (video: Video) => video.site === 'YouTube' && video.type === 'Teaser'
    ) || null;

    return <MovieDetailClient movie={movie} trailer={officialTrailer} />;

  } catch (error: any) {
    console.error(`Failed to fetch movie data for ID ${movieId}:`, error.message);
    if (error.status === 404) { 
      notFound();
    }
    return (
      <p className="text-red-500 text-center mt-10">
        Не удалось загрузить информацию о фильме. Пожалуйста, попробуйте позже.
      </p>
    );
  }
}