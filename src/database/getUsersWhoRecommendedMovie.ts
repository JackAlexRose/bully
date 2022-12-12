import UserMovieRecommendationsModel from "./models/UserMovieRecommendationsModel";

export default async (id: number): Promise<string[]> => {
  const usersWhoRecommendedMovie =
    (
      await UserMovieRecommendationsModel.find({
        recommendedMovies: { $all: [id] },
      })
    ).map((user) => user.discordId) || [];

  return usersWhoRecommendedMovie;
};
