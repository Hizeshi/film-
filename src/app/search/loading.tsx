// src/app/search/loading.tsx
import MovieCardSkeleton from "@/components/MovieCardSkeleton";

export default function SearchLoading() {

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-2 animate-pulse"></div>
      <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded w-1/3 mb-8 animate-pulse"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-6">
        {[...Array(10)].map((_, index) => (
          <MovieCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}