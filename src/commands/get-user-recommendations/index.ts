import Command from "../../interfaces/Command";
import { SlashCommandBuilder } from "discord.js";
import getUserMovieRecommendations from "../../database/getUserMovieRecommendations";
import { queryMovie } from "../../api/queryMovie";
import { EmbedBuilder } from "@discordjs/builders";
import { Table } from "embed-table";

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

    const table = new Table({
      titles: ["Film Title", "Year", "Rating"],
      titleIndexes: [0, 24, 22],
      columnIndexes: [0, 22, 20],
      start: "`",
      end: "`",
      padEnd: 3,
    });

    await userRecommendations.forEach(async (recommendation) => {
      const movie = await queryMovie(recommendation);

      table.addRow([
        movie.title.slice(0, 17) + "..." || "None",
        movie.release_date?.toString() || "None",
        movie.vote_average?.toString() || "None",
      ]);
    });

    const guildMember = await interaction.guild?.members.fetch(userId);
    const userThumbnail = guildMember?.user.avatarURL() || "";

    const embed = new EmbedBuilder()
      .setTitle(`${userTag}'s recommendations:`)
      .setThumbnail(userThumbnail || "")
      .addFields([table.toField()]);

    await interaction.reply({
      embeds: [embed],
    });
  },
};

export default getUserRecommendations;
