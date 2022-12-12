import Command from "../../interfaces/Command";
import { SlashCommandBuilder } from "discord.js";
import getUserMovieRecommendations from "../../database/getUserMovieRecommendations";
import { queryMovie } from "../../api/queryMovie";
import { EmbedBuilder } from "@discordjs/builders";

import isValidUserTag from "../../utils/isValidUserTag";

const getUserRecommendations: Command = {
  data: new SlashCommandBuilder()
    .setName("recommendations")
    .setDescription("Get a list of a user's recommendations")
    .addStringOption((option) =>
      option
        .setName("user-tag")
        .setDescription("tag the user here")
        .setRequired(true)
    ),
  async execute(interaction) {
    const userTag = interaction.options.getString("user-tag", true);

    if (!isValidUserTag(userTag)) {
      await interaction.reply({
        content: "Invalid user tag!",
        ephemeral: true,
      });
      return;
    }

    const userId = userTag.replace(/<|>/g, "").replace(/^@/g, "");
    const userRecommendations = await getUserMovieRecommendations(userId);

    if (userRecommendations.length === 0) {
      await interaction.reply({
        content: "This user has no recommendations!",
        ephemeral: true,
      });
      return;
    }

    const userRecommendationEmbeds = await Promise.all(
      userRecommendations.map(async (recommendation) => {
        return await queryMovie(recommendation);
      })
    );

    const embeds = userRecommendationEmbeds.map((movie) => {
      return new EmbedBuilder()
        .setTitle(movie.title)
        .setURL(`https://www.themoviedb.org/movie/${movie.id}`)
        .setDescription(movie.overview || "No overview available.")
        .setThumbnail(`https://image.tmdb.org/t/p/w500${movie.poster_path}`)
        .addFields([
          {
            name: "Release Date",
            value: movie.release_date || "No release date available.",
            inline: true,
          },
          {
            name: "Rating",
            value: movie.vote_average?.toString() || "No rating available.",
            inline: true,
          },
        ]);
    });

    await interaction.reply({
      content: `Here are ${userTag}'s recommendations:`,
      embeds: embeds,
    });
  },
};

export default getUserRecommendations;
