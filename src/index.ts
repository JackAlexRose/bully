import { ChatInputCommandInteraction, Client } from "discord.js";
import { IntentOptions } from "./config/IntentOptions";
import onInteraction from "./events/onInteraction";

(async () => {
  const DiscordClient = new Client({ intents: IntentOptions });
  DiscordClient.on("ready", () => console.log("Connected to Discord!"));

  DiscordClient.on(
    "interactionCreate",
    async (interaction) =>
      await onInteraction(interaction as ChatInputCommandInteraction)
  );

  await DiscordClient.login(process.env.BOT_TOKEN);
})();
