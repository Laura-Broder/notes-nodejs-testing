const validator = require("validator");
const chalk = require("chalk");
const notes = require("./notes");
const yargs = require("yargs");

// use nodemon app.js to rerun when save file
yargs.command({
  command: "add",
  describe: "Add a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    const status = notes.addNote(argv.title, argv.body);
    if (status) {
      console.log(chalk.green.inverse("New note added"));
    } else {
      console.log(chalk.red.inverse("note title taken"));
    }
  },
});

yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    const status = notes.removeNote(argv.title);
    if (status) {
      console.log(chalk.green.inverse("note removed"));
    } else {
      console.log(chalk.red.inverse("node not found"));
    }
  },
});

yargs.command({
  command: "list",
  describe: "Display a list of the notes",
  handler() {
    const list = notes.listNotes();
    if (list.length) {
      console.log(chalk.bold.greenBright("Your notes:"));
      console.table(list);
    } else {
      console.log(chalk.red.inverse("list is empty"));
    }
  },
});

yargs.command({
  command: "read",
  describe: "Read a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    const note = notes.readNote(argv.title);
    if (note) {
      console.log(chalk.blue.bold(note.title));
      console.log(note.body);
    } else {
      console.log(chalk.red.inverse("Title not found"));
    }
  },
});

yargs.parse();
