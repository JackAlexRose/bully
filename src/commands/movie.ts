import Command from "../interfaces/Command";
import { searchForMovie } from "../api/searchForMovie";
import { queryMovie } from "../api/queryMovie";
import {
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
  SlashCommandBuilder,
} from "@discordjs/builders";
import { APIEmbed, ButtonStyle, ComponentType } from "discord.js";
import { randomColor } from "../constants";
import { Movie } from "../types/movie";

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
        const movie = results[0];

        const movieDetails = await queryMovie(movie.id);

        const embed = buildEmbed(movieDetails);
        const ephemeralActionRow = buildEphemeralActionRow();

        const interactionResponse = await interaction.reply({
          embeds: [embed],
          components: [ephemeralActionRow],
          ephemeral: true,
        });

        interactionResponse
          .awaitMessageComponent({
            componentType: ComponentType.Button,
            time: 60000,
          })
          .then(async (buttonInteraction) => {
            if (buttonInteraction.customId === "correct") {
              const actionRow = buildReccomendActionRow();

              await buttonInteraction.reply({
                embeds: [embed],
                components: [actionRow],
              });
            }
          });
      }
    } catch (error) {
      await interaction.reply(
        `An error occurred when trying to find the movie ${title}: ${error}`
      );
    }
  },
};

const buildEmbed = (movieDetails: Movie): APIEmbed => {
  const embed = new EmbedBuilder()
    .setTitle(movieDetails.title)
    .setDescription(movieDetails.overview || "No overview available.")
    .setURL(`https://www.themoviedb.org/movie/${movieDetails.id}`)
    .addFields([
      {
        name: "Release Date",
        value: movieDetails.release_date || "Unknown",
        inline: true,
      },
      {
        name: "Rating",
        value: movieDetails.vote_average?.toString() || "Unknown",
        inline: true,
      },
      {
        name: "Runtime",
        value: `${movieDetails.runtime?.toString()} minutes` || "Unknown",
        inline: true,
      },
      {
        name: "Genres",
        value:
          movieDetails.genres?.map((genre) => genre.name).join(", ") ||
          "Unknown",
        inline: false,
      },
      {
        name: "Spoken Languages",
        value:
          movieDetails.spoken_languages
            ?.map((language) => language.name)
            .join(", ") || "Unknown",
        inline: false,
      },
      {
        name: "Budget",
        value:
          movieDetails.budget && movieDetails.budget > 0
            ? movieDetails.budget?.toLocaleString()
            : "Unknown",
        inline: true,
      },
      {
        name: "Revenue",
        value:
          movieDetails.revenue && movieDetails.revenue > 0
            ? movieDetails.revenue?.toLocaleString()
            : "Unknown",
        inline: true,
      },
      {
        name: "Trailer",
        value:
          movieDetails.videos?.results &&
          movieDetails.videos?.results[0]?.site === "YouTube" &&
          movieDetails.videos?.results[0].key !== undefined
            ? `https://www.youtube.com/watch?v=${movieDetails.videos?.results[0].key}`
            : "No trailer available.",
      },
    ])
    .setImage(`https://image.tmdb.org/t/p/original${movieDetails.poster_path}`)
    .setColor(randomColor());

  return embed.toJSON();
};

const buildEphemeralActionRow = (): ActionRowBuilder<ButtonBuilder> => {
  return new ActionRowBuilder<ButtonBuilder>().addComponents([
    new ButtonBuilder()
      .setCustomId("correct")
      .setLabel("This was the movie I was looking for")
      .setStyle(ButtonStyle.Success),
    new ButtonBuilder()
      .setCustomId("false")
      .setLabel("This was not the movie I was looking for")
      .setStyle(ButtonStyle.Danger),
  ]);
};

const buildReccomendActionRow = (): ActionRowBuilder<ButtonBuilder> => {
  return new ActionRowBuilder<ButtonBuilder>().addComponents([
    new ButtonBuilder()
      .setCustomId("approve")
      .setLabel("I approve")
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId("disapprove")
      .setLabel("I disapprove")
      .setStyle(ButtonStyle.Danger),
  ]);
};

export default movie;
