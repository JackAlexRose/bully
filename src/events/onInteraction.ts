import { ChatInputCommandInteraction } from "discord.js";
import getCommandList from "../commands/getCommandList";

export default async (interaction: ChatInputCommandInteraction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  const commandList = getCommandList();

  for (const command of commandList) {
    if (command.data.name === commandName) {
      await command.execute(interaction);
      return;
    }
  }
};
