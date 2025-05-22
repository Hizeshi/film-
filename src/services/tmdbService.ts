// src/services/tmdbService.ts

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

const fetchData = async <T>(endpoint: string, options: FetchOptions = {}): Promise<T> => {
  const { params, ...actualFetchOptions } = options;

  const url = new URL(`${BASE_URL}${endpoint}`);
  if (!API_KEY) {
    throw new Error("TMDB API Key is not defined. Please check your .env.local file.");
  }
  url.searchParams.append('api_key', API_KEY);
  url.searchParams.append('language', 'ru-RU');

  if (params) {
    for (const key in params) {
      url.searchParams.append(key, String(params[key]));
    }
  }

  try {
    const response = await fetch(url.toString(), actualFetchOptions);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        status_message: `Request failed with status ${response.status}`,
        success: false,
        status_code: response.status
      }));
      console.error('API Error Response:', errorData);
      const errorMessage = errorData.status_message || `API request failed with status ${response.status}`;
      const error = new Error(errorMessage) as Error & { status?: number };
      error.status = response.status;
      throw error;
    }
    return response.json() as Promise<T>;
  } catch (error) {
    console.error('Fetch Error in fetchData:', error);
    throw error;
  }
};

export interface Genre { 
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  overview: string;
  genre_ids?: number[]; 
  genres?: Genre[]; 
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
  return fetchData<Movie>(`/movie/${movieId}`, { params: { append_to_response: 'videos,credits' } });
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

export interface VideosResponse {
  results: Video[];
}

export interface CastMember {
  id: number;
  name: string;
  profile_path: string | null;
  character: string;
  order: number; 
}

export interface CrewMember {
  id: number;
  name: string;
  profile_path: string | null;
  job: string;
  department: string;
}
export interface Credits {
  cast: CastMember[];
  crew: CrewMember[];
}

export const searchMovies = async (query: string, page: number = 1): Promise<PaginatedResponse<Movie>> => {
  if (!query.trim()) { 
    return { page: 1, results: [], total_pages: 0, total_results: 0 };
  }
  return fetchData<PaginatedResponse<Movie>>('/search/movie', { params: { query, page, include_adult: false } });
};

export interface GenresListResponse {
  genres: Genre[];
}
export const getGenres = async (): Promise<GenresListResponse> => {
  return fetchData<GenresListResponse>('/genre/movie/list');
};