const {
  clearList,
  addNote,
  removeNote,
  listNotes,
  readNote,
} = require("./notes");

describe("notes", () => {
  describe("add new note", () => {
    test("add new note to an empty list", () => {
      clearList();

      const result = addNote("test title", "test body");

      expect(result).toBe(true);
    });

    test("add a note with non-unique title", () => {
      clearList();
      addNote("test title", "test body");

      const result = addNote("test title", "test body");

      expect(result).toBe(false);
    });

    test("add a note without content", () => {
      clearList();

      const getResult = () => addNote();

      expect(getResult).toThrowError();
    });
  });

  describe("remove a note", () => {
    test("remove a note from an empty list", () => {
      clearList();

      const result = removeNote("test title");

      expect(result).toBe(false);
    });

    test("remove a note with a title that doesn't exist", () => {
      clearList();
      addNote("test title", "test body");

      const result = removeNote("test");

      expect(result).toBe(false);
    });

    test("remove a note without a title", () => {
      clearList();
      addNote("test title", "test body");

      const result = removeNote();

      expect(result).toBe(false);
    });

    test("remove a note", () => {
      clearList();
      addNote("test title", "test body");

      const result = removeNote("test title");

      expect(result).toBe(true);
    });
  });

  describe("list notes", () => {
    test("get an empty list of notes", () => {
      clearList();

      const result = listNotes();

      expect(result).toEqual([]);
    });

    test("get a list of notes", () => {
      clearList();
      addNote("test title", "test body");

      const result = listNotes();

      const expected = [{ title: "test title", body: "test body" }];

      expect(result).toEqual(expected);
    });
  });

  describe("read note", () => {
    test("read a note from an empty list", () => {
      clearList();

      const result = readNote("test");

      expect(result).toBeUndefined();
    });

    test("read a note that doesn't exist", () => {
      clearList();
      addNote("test title", "test body");

      const result = readNote("test");

      expect(result).toBeUndefined();
    });

    test("read a note without content", () => {
      clearList();
      addNote("test title", "test body");

      const result = readNote();

      expect(result).toBeUndefined();
    });

    test("read a note", () => {
      clearList();
      addNote("test title", "test body");

      const result = readNote("test title");

      const expected = { title: "test title", body: "test body" };

      expect(result).toEqual(expected);
    });
  });
});
