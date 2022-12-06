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
        path: "src/commands/{{dashCase name}}.ts",
        templateFile: "templates/command.ts.hbs",
      },
    ],
  });
};
