import { REST } from "@discordjs/rest";
import { Client } from "discord.js";
import getCommandList from "../utils/getCommandList";
import { Routes } from "discord-api-types/v10";

export default async (DiscordClient: Client) => {
  const rest = new REST({ version: "10" }).setToken(
    process.env.DISCORD_BOT_TOKEN as string
  );

  const commandData = getCommandList().map((command) => command.data.toJSON());

  await rest.put(
    Routes.applicationGuildCommands(
      DiscordClient.user!.id,
      process.env.TEST_GUILD_ID as string
    ),
    { body: commandData }
  );
  console.log("Discord bot is ready!");
};
