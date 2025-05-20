// src/services/tmdbService.ts

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

const fetchData = async <T>(endpoint: string, options: FetchOptions = {}): Promise<T> => {
  const { params, ...fetchOptions } = options;
  
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.append('api_key', API_KEY!);
  url.searchParams.append('language', 'ru-RU'); 

  if (params) {
    for (const key in params) {
      url.searchParams.append(key, String(params[key]));
    }
  }

  try {
    const response = await fetch(url.toString(), fetchOptions);
    if (!response.ok) {
      console.error('API Error Response:', await response.json());
      throw new Error(`API request failed with status ${response.status}`);
    }
    return response.json() as Promise<T>;
  } catch (error) {
    console.error('Fetch Error:', error);
    throw error;
  }
};

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  overview: string;
}

export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export const getPopularMovies = async (page: number = 1): Promise<PaginatedResponse<Movie>> => {
  return fetchData<PaginatedResponse<Movie>>('/movie/popular', { params: { page } });
};

export const getMovieDetails = async (movieId: number): Promise<Movie> => {
  return fetchData<Movie>(`/movie/${movieId}`);
};