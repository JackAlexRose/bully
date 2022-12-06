export default () => {
  if (!process.env.DISCORD_BOT_TOKEN) {
    console.warn("Missing Discord bot token.");
    return false;
  }
  if (!process.env.DISCORD_CLIENT_ID) {
    console.warn("Missing Discord client ID.");
    return false;
  }
  return true;
};
