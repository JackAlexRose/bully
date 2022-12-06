const TMDB_BASE_URL = "https://api.themoviedb.org/3";
export const TMDB_SEARCH_MOVIE_URL = `${TMDB_BASE_URL}/search/movie`;
export const TMDB_MOVIE_URL = `${TMDB_BASE_URL}/movie/:movieId`;

export const tmdbQueryFormatter = (query: string) => {
  return query
    .replace(/\s/g, "+")
    .replace(/[^a-zA-Z0-9+]/g, "")
    .toLowerCase();
};
