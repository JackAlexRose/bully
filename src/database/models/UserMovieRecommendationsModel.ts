import { Document, model, Schema } from "mongoose";

export interface IUserMovieRecommendations extends Document {
  discordId: string;
  recommendedMovies: number[];
}

export const UserMovieRecommendationsSchema = new Schema({
  discordId: {
    type: String,
    required: true,
  },
  recommendedMovies: {
    type: [Number],
    required: true,
  },
});

export default model<IUserMovieRecommendations>(
  "UserMovieRecommendations",
  UserMovieRecommendationsSchema
);
