import Command from "../../interfaces/Command";
import { SlashCommandBuilder } from "discord.js";

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
    const exampleInput = interaction.options.getString("user-tag", true);
    await interaction.reply(`You said: ${exampleInput}`);
  },
};

export default getUserRecommendations;
