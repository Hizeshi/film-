// src/services/tmdbService.ts

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

const fetchData = async <T>(endpoint: string, options: FetchOptions = {}): Promise<T> => {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.append('api_key', API_KEY as string);
  
  if (options.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  const fetchOptions: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    }
  };

  try {
    const response = await fetch(url.toString(), fetchOptions);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown API error structure' }));
      console.error('API Error Response:', errorData);
      const error = new Error(`API request failed with status ${response.status}: ${errorData.status_message || JSON.stringify(errorData)}`) as Error & { status: number };
      error.status = response.status;
      throw error;
    }
    return response.json() as Promise<T>;
  } catch (error) {
    console.error('Fetch Error in fetchData:', error);
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

export interface Video {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string; 
  site: string; 
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

interface VideosResponse {
  id: number;
  results: Video[];
}

export const getMovieVideos = async (movieId: number): Promise<VideosResponse> => {
  return fetchData<VideosResponse>(`/movie/${movieId}/videos`);
};