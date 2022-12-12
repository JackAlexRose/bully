import userMovieRecommendationsModel from "./models/UserMovieRecommendationsModel";

export default async (discordId: string, newMovie: number) => {
  await userMovieRecommendationsModel.findOneAndUpdate(
    { discordId: discordId },
    { $addToSet: { recommendedMovies: newMovie } }
  );
};
