import { get } from "./ApiClient";
import { Movie } from "../types/movie";
import urlBuilder from "../utils/urlBuilder";
import { TMDB_SEARCH_MOVIE_URL, tmdbQueryFormatter } from "./tmdbUtils";

export interface SearchForMovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export async function searchForMovie(
  title: string
): Promise<SearchForMovieResponse> {
  const path = urlBuilder(TMDB_SEARCH_MOVIE_URL, {
    api_key: process.env.TMDB_KEY!,
    query: tmdbQueryFormatter(title),
  });

  try {
    return await get<SearchForMovieResponse>(path);
  } catch (error) {
    throw new Error(
      `An error occurred while searching for the movie: ${error}`
    );
  }
}
