import Command from "../../interfaces/Command";
import { SlashCommandBuilder } from "discord.js";
import getUserMovieRecommendations from "../../database/getUserMovieRecommendations";
import { queryMovie } from "../../api/queryMovie";
import { EmbedBuilder } from "@discordjs/builders";
import { Table } from "embed-table";
import { table } from "table";
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

    const data = [["Title", "Release Date", "Rating"]];

    await userRecommendations.forEach(async (recommendation) => {
      const movie = await queryMovie(recommendation);

      data.push([
        movie.title.slice(0, 17) + "..." || "None",
        movie.release_date?.toString() || "None",
        movie.vote_average?.toString() || "None",
      ]);
    });

    const config = {
      drawHorizontalLine: (lineIndex: number, rowCount: number) => {
        return lineIndex === 1;
      },
    };

    const guildMember = await interaction.guild?.members.fetch(userId);
    const userThumbnail = guildMember?.user.avatarURL() || "";

    const embed = new EmbedBuilder()
      .setThumbnail(userThumbnail || "")
      .addFields([
        {
          name: `${userTag}'s recommendations:`,
          value: `\`\`\`\ntable(data, config)\`\`\``,
        },
      ]);

    await interaction.reply({
      embeds: [embed],
    });
  },
};

export default getUserRecommendations;
