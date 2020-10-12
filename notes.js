const fs = require("fs");
const chalk = require("chalk");

const addNote = (title, body) => {
  if (!title || !body) throw new Error("a note must have a title and a body");

  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({ title: title, body: body });
    saveNotes(notes);
    return true;
  } else return false;
};

const removeNote = (title) => {
  const notes = loadNotes();
  const newNotes = notes.filter((note) => note.title !== title);
  if (newNotes.length !== notes.length) {
    saveNotes(newNotes);
    return true;
  } else return false;
};

const listNotes = () => {
  const notes = loadNotes();
  return notes;
};

const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);
  return note;
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};
// for testing
const clearList = () => {
  fs.writeFileSync("notes.json", "");
};

module.exports = {
  addNote,
  removeNote,
  listNotes,
  readNote,
  clearList,
};
