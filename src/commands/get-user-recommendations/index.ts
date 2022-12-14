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

    const user = await interaction.guild?.members.fetch(userId);
    const userThumbnail = user?.user.avatarURL() || null;
    const userDisplayName = user?.displayName || userTag;

    const embed = new EmbedBuilder()
      .setTitle(`${userDisplayName}'s recommendations`)
      .setThumbnail(userThumbnail);

    userRecommendationEmbeds.forEach((movie, index) => {
      embed.addFields([
        {
          name: `${index + 1}. ${movie.title}` || "No Title available",
          value: `${movie.release_date?.slice(0, 4) || "Unknown"}, ${
            movie.vote_average?.toFixed(1) || "Unknown"
          }/10`,
        },
      ]);
    });

    await interaction.reply({
      embeds: [embed],
    });
  },
};

export default getUserRecommendations;
