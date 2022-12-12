import UserMovieRecommendationsModel from "./models/UserMovieRecommendationsModel";

export default async (id: string) => {
  const userMovieRecommendations =
    (await UserMovieRecommendationsModel.findOne({ id })) ||
    (await UserMovieRecommendationsModel.create({
      discordId: id,
      recommendedMovies: [],
    }));

  return userMovieRecommendations;
};
