export default () => {
  if (!process.env.DISCORD_BOT_TOKEN) {
    console.warn("Missing Discord bot token.");
    return false;
  }
  if (!process.env.DISCORD_CLIENT_ID) {
    console.warn("Missing Discord client ID.");
    return false;
  }
  if (!process.env.MONGO_USER) {
    console.warn("MONGO_USER is not defined in the environment variables!");
    return false;
  }
  if (!process.env.MONGO_PASS) {
    console.warn("MONGO_PASS is not defined in the environment variables!");
    return false;
  }
  if (!process.env.MONGO_ADDRESS) {
    console.warn("MONGO_ADDRESS is not defined in the environment variables!");
    return false;
  }
  return true;
};
