import { get } from "./ApiClient";
import { Movie } from "../types/movie";

export async function queryMovie(movieId: string): Promise<Movie | string> {
  const path = `http://www.omdbapi.com/${movieId}?apikey=${process.env.TMDB_API_KEY}`;
  return await get<Movie>(path);
}
