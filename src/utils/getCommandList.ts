import Command from "../interfaces/Command";
import { readdirSync } from "fs";
import { join } from "path";

export default () => {
  const commandsPath = join(__dirname, "src/commands");
  const commandList: Command[] = [];
  const commandFiles = readdirSync(commandsPath).filter((file) =>
    file.endsWith(".ts")
  );

  for (const file of commandFiles) {
    const filePath = join(commandsPath, file);
    const command = require(filePath);
    commandList.push(command);
  }

  return commandList;
};
