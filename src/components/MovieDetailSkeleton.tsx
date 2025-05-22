// src/components/MovieDetailSkeleton.tsx
export default function MovieDetailSkeleton() {
    return (
      <div className="container mx-auto py-8 px-4 animate-pulse">
        <div className="md:flex md:space-x-8">
          <div className="md:w-1/3 mb-6 md:mb-0">
            <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-lg aspect-[2/3]"></div>
          </div>
          <div className="md:w-2/3">
            <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-6"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-3"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/6"></div>
            </div>
            <div className="mt-8">
              <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-3"></div>
              <div className="aspect-w-16 aspect-h-9 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }