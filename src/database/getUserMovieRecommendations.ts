import UserMovieRecommendationsModel from "./models/UserMovieRecommendationsModel";

export default async (id: string) => {
  const userMovieRecommendations =
    (await UserMovieRecommendationsModel.findOne({ discordId: id }))
      ?.recommendedMovies || [];

  return userMovieRecommendations;
};
