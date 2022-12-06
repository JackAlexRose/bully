import { get } from "./ApiClient";
import { Movie } from "../types/movie";

export interface SearchForMovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export async function searchForMovie(
  title: string
): Promise<SearchForMovieResponse | string> {
  const path = `http://www.omdbapi.com/?apikey=${process.env.TMDB_API_KEY}&s=${title}`;
  return await get<SearchForMovieResponse>(path);
}
