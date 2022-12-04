import { Client } from "discord.js";
import { IntentOptions } from "./config/IntentOptions";

(async () => {
  const DiscordClient = new Client({ intents: IntentOptions });
  DiscordClient.on("ready", () => console.log("Connected to Discord!"));

  await DiscordClient.login(process.env.BOT_TOKEN);
})();
