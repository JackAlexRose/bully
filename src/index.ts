import { ChatInputCommandInteraction, Client } from "discord.js";
import validateEnv from "./utils/validateEnv";
import { IntentOptions } from "./config/IntentOptions";
import onInteraction from "./events/onInteraction";

(async () => {
  if (!validateEnv()) return;

  const DiscordClient = new Client({ intents: IntentOptions });
  DiscordClient.on("ready", () => console.log("Connected to Discord!"));

  DiscordClient.on(
    "interactionCreate",
    async (interaction) =>
      await onInteraction(interaction as ChatInputCommandInteraction)
  );

  await DiscordClient.login(process.env.DISCORD_BOT_TOKEN);
})();
