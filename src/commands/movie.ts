import Command from "../interfaces/Command";
import { SlashCommandBuilder } from "discord.js";

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
    await interaction.reply("Pong!");
  },
};
