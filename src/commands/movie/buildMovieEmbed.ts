import { EmbedBuilder } from "@discordjs/builders";
import { randomColor } from "../../constants";
import { Movie } from "../../types/movie";
import { buildReccomendActionRow } from "./buildActionRow";

export default (movieDetails: Movie, recommenders?: string[]) => {
  const embed = new EmbedBuilder()
    .setTitle(movieDetails.title)
    .setDescription(movieDetails.overview || "No overview available.")
    .setURL(`https://www.themoviedb.org/movie/${movieDetails.id}`)
    .addFields([
      {
        name: "Release Date",
        value: movieDetails.release_date?.slice(0, 4) || "Unknown",
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
            ? `$${movieDetails.budget?.toLocaleString()}`
            : "Unknown",
        inline: true,
      },
      {
        name: "Revenue",
        value:
          movieDetails.revenue && movieDetails.revenue > 0
            ? `$${movieDetails.revenue?.toLocaleString()}`
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
    .setColor(randomColor())
    .setFooter({
      text: `${recommenders?.join(", ") || "No-one"} recommend(s) this film.`,
    });

  return {
    embeds: [embed.toJSON()],
    components: [buildReccomendActionRow()],
  };
};
