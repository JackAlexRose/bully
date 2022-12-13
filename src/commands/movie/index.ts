import { SlashCommandBuilder } from "@discordjs/builders";
import { ComponentType } from "discord.js";

import Command from "../../interfaces/Command";
import { searchForMovie } from "../../api/searchForMovie";
import { queryMovie } from "../../api/queryMovie";
import buildMovieEmbed from "./buildMovieEmbed";
import buildSearchEmbed from "./buildSearchEmbed";

import getUsersWhoRecommendedMovie from "../../database/getUsersWhoRecommendedMovie";
import updateUserMovieRecommendations from "../../database/updateUserMovieRecommendations";

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
  async execute(initialMovieInteraction) {
    const title = initialMovieInteraction.options.getString("title", true);
    try {
      const { results: movieSearchResults } = await searchForMovie(title);

      if (movieSearchResults.length === 0) {
        await initialMovieInteraction.reply({
          content: "No results found.",
          ephemeral: true,
        });
      } else {
        const searchResponse = await initialMovieInteraction.reply(
          buildSearchEmbed(movieSearchResults)
        );

        let filmSelectButtonInteraction;
        try {
          filmSelectButtonInteraction =
            await searchResponse.awaitMessageComponent({
              componentType: ComponentType.Button,
              time: 60000,
            });
        } catch (error) {
          await initialMovieInteraction.editReply({
            content: "You took too long to select a movie.",
            embeds: [],
            components: [],
          });

          setTimeout(() => {
            initialMovieInteraction.deleteReply();
          }, 10000);
          return;
        }

        await filmSelectButtonInteraction.deferUpdate();

        const movieDetails = await queryMovie(
          movieSearchResults[parseInt(filmSelectButtonInteraction.customId) - 1]
            .id
        );

        const pastRecommenders: string[] = await getUsersWhoRecommendedMovie(
          movieDetails.id
        );

        const recommenders = await Promise.all(
          pastRecommenders.map(async (recommender) => {
            const guildMember =
              await initialMovieInteraction.guild?.members.fetch(recommender);
            return guildMember?.displayName || "Unknown";
          })
        );

        const movieDetailsReply = await initialMovieInteraction.editReply(
          buildMovieEmbed(movieDetails, recommenders)
        );

        const collector = movieDetailsReply.createMessageComponentCollector({
          componentType: ComponentType.Button,
        });

        collector.on("collect", async (recommendInteraction) => {
          await recommendInteraction.deferUpdate();

          const guildMember = await recommendInteraction.guild?.members.fetch(
            recommendInteraction.user.id
          );
          const memberDisplayName = guildMember?.displayName;

          if (!memberDisplayName || recommenders.includes(memberDisplayName))
            return;

          if (recommendInteraction.customId === "recommend") {
            await updateUserMovieRecommendations(
              recommendInteraction.user.id,
              movieDetails.id
            );
            await recommenders.push(memberDisplayName);
          }

          await recommendInteraction.editReply(
            buildMovieEmbed(movieDetails, recommenders)
          );
        });
      }
    } catch (error) {
      console.warn(error);
      await initialMovieInteraction.reply({
        content: `An error occurred when trying to find the movie ${title}: ${error}`,
        ephemeral: true,
      });
    }
  },
};

export default movie;
