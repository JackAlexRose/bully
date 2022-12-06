import Command from "../interfaces/Command";
import { readdirSync } from "fs";
import { join } from "path";

export default () => {
  const commandsPath = join(__dirname, "../commands");
  const commandList: Command[] = [];
  const commandFiles = readdirSync(commandsPath).filter((file) =>
    file.endsWith(".js")
  );

  for (const file of commandFiles) {
    const filePath = join(commandsPath, file);
    const command = require(filePath).default as Command;
    commandList.push(command);
  }

  return commandList;
};
