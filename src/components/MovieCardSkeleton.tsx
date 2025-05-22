// src/components/MovieCardSkeleton.tsx
export default function MovieCardSkeleton() {
    return (
      <div className="border rounded-lg shadow-lg bg-white animate-pulse">
        <div className="w-full bg-gray-300 dark:bg-gray-700 aspect-[2/3]"></div>
        <div className="p-3">
          <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
        </div>
      </div>
    );
  }