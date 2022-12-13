import { REST } from "@discordjs/rest";
import { Client } from "discord.js";
import getCommandList from "../commands/getCommandList";
import { Routes } from "discord-api-types/v10";

export default async (DiscordClient: Client) => {
  const rest = new REST({ version: "10" }).setToken(
    process.env.DISCORD_BOT_TOKEN as string
  );

  const commandData = getCommandList().map((command) => command.data.toJSON());

  await rest.put(Routes.applicationCommands(DiscordClient.user!.id), {
    body: commandData,
  });
  console.log("Discord bot is ready!");
};
