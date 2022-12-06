import { get } from "./ApiClient";
import { Movie } from "../types/movie";

export async function queryMovie(movieId: string): Promise<Movie> {
  const path = `http://www.omdbapi.com/${movieId}?apikey=${process.env.TMDB_API_KEY}`;
  try {
    return await get<Movie>(path);
  } catch (error) {
    throw new Error(`An error occurred while querying the movie: ${error}`);
  }
}
