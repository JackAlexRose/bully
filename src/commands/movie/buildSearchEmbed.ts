import { EmbedBuilder } from "@discordjs/builders";
import { randomColor } from "../../constants";
import { Movie } from "../../types/movie";
import { buildSearchActionRows } from "./buildActionRow";

export default (movieOptions: Movie[]) => {
  const embed = new EmbedBuilder()
    .setTitle("Possible Movies")
    .setDescription("Please select the movie you were looking for.")
    .setColor(randomColor());

  for (let i = 0; i < movieOptions.length && i < 10; i++) {
    const movie = movieOptions[i];
    embed.addFields([
      {
        name: `${i + 1}. ${movie.title}`,
        value: `${movie.overview || "No overview available."} (${
          movie.release_date?.slice(0, 4) || "Unknown"
        })`,
        inline: false,
      },
    ]);
  }

  return {
    embeds: [embed.toJSON()],
    components: [...buildSearchActionRows(movieOptions.length)],
  };
};
``;
