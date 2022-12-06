import Command from "../interfaces/Command";
import { searchForMovie } from "../api/searchForMovie";
import { queryMovie } from "../api/queryMovie";
import {
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
  SlashCommandBuilder,
} from "@discordjs/builders";
import { ButtonStyle } from "discord.js";

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

        const embed = new EmbedBuilder()
          .setTitle(movieDetails.title)
          .setDescription(movieDetails.overview || "No overview available.")
          .setURL(`https://www.themoviedb.org/movie/${movie.id}`)
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
              value: movieDetails.runtime?.toString() || "Unknown",
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
              value: movieDetails.budget?.toLocaleString() || "Unknown",
              inline: true,
            },
            {
              name: "Revenue",
              value: movieDetails.revenue?.toLocaleString() || "Unknown",
              inline: true,
            },
            {
              name: "Trailer",
              value:
                movieDetails.videos?.results &&
                movieDetails.videos?.results[0].site === "YouTube" &&
                movieDetails.videos?.results[0].key !== undefined
                  ? `https://www.youtube.com/watch?v=${movieDetails.videos?.results[0].key}`
                  : "No trailer available.",
            },
          ])
          .setImage(
            `https://image.tmdb.org/t/p/w300${movieDetails.poster_path}`
          )
          .setColor(0xffd500);

        const actionRow = new ActionRowBuilder<ButtonBuilder>().addComponents([
          new ButtonBuilder()
            .setCustomId("retry")
            .setLabel("Not the right movie?")
            .setStyle(ButtonStyle.Primary),
          new ButtonBuilder()
            .setCustomId("recommend")
            .setLabel("I recommend this movie!")
            .setStyle(ButtonStyle.Success),
          new ButtonBuilder()
            .setCustomId("not-recommend")
            .setLabel("I don't like this movie!")
            .setStyle(ButtonStyle.Danger),
        ]);

        await interaction.reply({ embeds: [embed], components: [] });
      }
    } catch (error) {
      await interaction.reply(
        `An error occurred when trying to find the movie`
      );
    }
  },
};

export default movie;
