import { SlashCommandBuilder } from "@discordjs/builders";
import { ComponentType } from "discord.js";

import Command from "../../interfaces/Command";
import { searchForMovie } from "../../api/searchForMovie";
import { queryMovie } from "../../api/queryMovie";
import buildMovieEmbed from "./buildMovieEmbed";
import {
  buildEphemeralActionRow,
  buildReccomendActionRow,
} from "./buildActionRow";

const movie: Command = {
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
    try {
      const { results } = await searchForMovie(title);

      if (results.length === 0) {
        await interaction.reply({
          content: "No results found.",
          ephemeral: true,
        });
      } else {
        const firstMovieDetails = await queryMovie(results[0].id);

        const embed = buildMovieEmbed(firstMovieDetails);
        const ephemeralActionRow = buildEphemeralActionRow();

        const interactionResponse = await interaction.reply({
          embeds: [embed],
          components: [ephemeralActionRow],
          ephemeral: true,
        });

        const buttonInteraction =
          await interactionResponse.awaitMessageComponent({
            componentType: ComponentType.Button,
            time: 60000,
          });

        if (buttonInteraction.customId === "correct") {
          const actionRow = buildReccomendActionRow();

          await buttonInteraction.reply({
            embeds: [embed],
            components: [actionRow],
          });
        } else {
          await buttonInteraction.reply({
            content: "Please try again.",
            ephemeral: true,
          });
        }
      }
    } catch (error) {
      await interaction.reply(
        `An error occurred when trying to find the movie ${title}: ${error}`
      );
    }
  },
};

export default movie;
