import { get } from "./ApiClient";
import { Movie } from "../types/movie";
import urlBuilder from "../utils/urlBuilder";
import { TMDB_MOVIE_URL } from "./tmdbUtils";

export async function queryMovie(movieId: number): Promise<Movie> {
  const path = urlBuilder(
    TMDB_MOVIE_URL,
    {
      api_key: process.env.TMDB_KEY!,
      append_to_response: "videos",
    },
    {
      movieId: movieId.toString(),
    }
  );

  try {
    return await get<Movie>(path);
  } catch (error) {
    throw new Error(`An error occurred while querying the movie: ${error}`);
  }
}
