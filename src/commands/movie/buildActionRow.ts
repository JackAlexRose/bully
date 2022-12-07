import { ActionRowBuilder, ButtonBuilder } from "@discordjs/builders";
import { ButtonStyle } from "discord.js";

export const buildSearchActionRows = (
  amount: number
): ActionRowBuilder<ButtonBuilder>[] => {
  amount = Math.min(amount, 10);
  const rows = [];
  if (amount > 5) {
    rows.push(buildSearchActionRow(5, 1));
    rows.push(buildSearchActionRow(amount - 5, 6));
  } else {
    rows.push(buildSearchActionRow(amount, 1));
  }
  return rows;
};

const buildSearchActionRow = (
  amount: number,
  startIndex: number
): ActionRowBuilder<ButtonBuilder> => {
  return new ActionRowBuilder<ButtonBuilder>().addComponents([
    ...Array.from({ length: amount }, (_, i) => i + startIndex).map((i) => {
      return new ButtonBuilder()
        .setCustomId(i.toString())
        .setLabel(i.toString())
        .setStyle(ButtonStyle.Primary);
    }),
  ]);
};

export const buildReccomendActionRow = (): ActionRowBuilder<ButtonBuilder> => {
  return new ActionRowBuilder<ButtonBuilder>().addComponents([
    new ButtonBuilder()
      .setCustomId("recommend")
      .setLabel("Recommend")
      .setStyle(ButtonStyle.Primary),
  ]);
};
