import Command from "../interfaces/Command";
import { readdirSync } from "fs";
import { join } from "path";

export default () => {
  const commandsPath = join(__dirname, "../commands");
  const commandList: Command[] = [];

  // Use `readdirSync` to get a list of directories in the `commandsPath` directory.
  const directories = readdirSync(commandsPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  for (const directory of directories) {
    // Construct the path to the `index.js` file in each directory.
    const filePath = join(commandsPath, directory, "index");
    const command = require(filePath).default as Command;
    commandList.push(command);
  }

  return commandList;
};
