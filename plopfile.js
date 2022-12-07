module.exports = function (plop) {
  plop.setGenerator("command", {
    description: "Generate a new Discord command",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of the command?",
      },
      {
        type: "input",
        name: "description",
        message: "What is the description of the command?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/commands/{{dashCase name}}/index.ts",
        templateFile: "templates/command.ts.hbs",
      },
    ],
  });

  plop.setGenerator("task", {
    description: "Generate a new recurring Discord task",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of the task?",
      },
      {
        type: "input",
        name: "description",
        message: "What is the description of the task?",
      },
      {
        type: "list",
        name: "interval",
        message: "What is the interval of the task?",
        choices: [
          { name: "Every 5 minutes", value: "*/5 * * * *" },
          { name: "Every 30 minutes", value: "*/30 * * * *" },
          { name: "Every hour", value: "0 * * * *" },
          { name: "Every 12 hours", value: "0 */12 * * *" },
          { name: "Every day", value: "0 0 * * *" },
          { name: "Every week", value: "0 0 * * 0" },
          { name: "Every month", value: "0 0 1 * *" },
        ],
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/tasks/{{dashCase name}}/index.ts",
        templateFile: "templates/task.ts.hbs",
      },
    ],
  });
};
