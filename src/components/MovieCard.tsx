// src/components/MovieCard.tsx
import Link from 'next/link';
import { Movie } from '@/services/tmdbService'; 

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/photo_2025-05-21_17-50-20.jpg'; 

  return (
    <Link 
      href={`/movie/${movie.id}`} 
      className="group block border rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white transform hover:-translate-y-1"
      aria-label={`Подробнее о фильме ${movie.title}`}
    >
      <div className="relative">
        <img
          src={imageUrl}
          alt={`Постер фильма ${movie.title}`}
          className="w-full h-auto object-cover aspect-[2/3]"
          width={500} 
          height={750} 
        />
        {}
        { <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <p className="text-white text-lg">Подробнее</p>
        </div> }
      </div>
      <div className="p-3"> {}
        <h3 className="text-md font-semibold mb-1 truncate text-black" title={movie.title}>
          {movie.title}
        </h3>
        <p className="text-xs text-gray-600 mb-1">
          {new Date(movie.release_date).getFullYear()} {}
        </p>
        <div className="flex items-center">
          <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <span className="text-sm text-gray-700 font-semibold">
            {movie.vote_average > 0 ? movie.vote_average.toFixed(1) : 'N/A'}
          </span>
        </div>
      </div>
    </Link>
  );
}