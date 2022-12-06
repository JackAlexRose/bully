import { ActionRowBuilder, ButtonBuilder } from "@discordjs/builders";
import { ButtonStyle } from "discord.js";

export const buildEphemeralActionRow = (): ActionRowBuilder<ButtonBuilder> => {
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

export const buildReccomendActionRow = (): ActionRowBuilder<ButtonBuilder> => {
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
