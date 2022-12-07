import Command from "../interfaces/Command";
import { readdirSync } from "fs";
import { join } from "path";

export default () => {
  const commandList: Command[] = [];

  // Use `readdirSync` to get a list of directories in the `commandsPath` directory.
  const directories = readdirSync(__dirname, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  for (const directory of directories) {
    // Construct the path to the `index.js` file in each directory.
    const filePath = join(__dirname, directory);
    const command = require(filePath).default as Command;
    commandList.push(command);
  }

  return commandList;
};
