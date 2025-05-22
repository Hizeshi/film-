// src/app/movies/loading.tsx
import MovieCardSkeleton from "@/components/MovieCardSkeleton";

export default function MoviesLoading() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-center md:text-left">Популярные фильмы</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-6">
        {[...Array(10)].map((_, index) => ( 
          <MovieCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}