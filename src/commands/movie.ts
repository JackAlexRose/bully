import Command from "../interfaces/Command";
import { SlashCommandBuilder } from "discord.js";
import { searchForMovie } from "../api/searchForMovie";

export const movie: Command = {
  data: new SlashCommandBuilder()
    .setName("movie")
    .setDescription("Display information about a given movie.")
    .addStringOption((option) =>
      option
        .setName("title")
        .setDescription("The title of the movie.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const title = interaction.options.getString("title", true);
    const movie = await searchForMovie(title);
    if (typeof movie === "string") {
      await interaction.reply(movie);
    } else {
      await interaction.reply(
        `I found ${movie.total_results} movies matching ${title}.`
      );
    }
  },
};
