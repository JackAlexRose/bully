import { Interaction } from "discord.js";
import { CommandList } from "../commands/_CommandList";

export const onInteraction = async (interaction: Interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  for (const command of CommandList) {
    if (command.data.name === commandName) {
      await command.execute(interaction);
      return;
    }
  }
};
