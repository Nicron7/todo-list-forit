import express from "express";
import { validate } from "./middlewares/validate.js";
import { noteSchema } from "./schemas/notes.schema.js";
import db from "./sqlite.js";

const router = express.Router();

function formatNote(note) {
  return {
    ...note,
    completed: Boolean(note.completed),
  };
}

router.get("/", (req, res) => {
  try {
    const notes = db.prepare("SELECT * FROM notes").all();
    res.json(notes.map(formatNote));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const note = db.prepare("SELECT * FROM notes WHERE id = ?").get(id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.json(formatNote(note));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.post("/", validate(noteSchema), async (req, res) => {
  const { title, description } = req.body;
  try {
    const result = db
      .prepare(
        "INSERT INTO notes (title, description, completed) VALUES (?, ?, ?)"
      )
      .run(title, description, 0);
    const newNote = db
      .prepare("SELECT * FROM notes WHERE id = ?")
      .get(result.lastInsertRowid);
    res.status(201).json(formatNote(newNote));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.put("/:id", validate(noteSchema), async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const note = db.prepare("SELECT * FROM notes WHERE id = ?").get(id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    db.prepare("UPDATE notes SET title = ?, description = ? WHERE id = ?").run(
      title,
      description,
      note.id
    );
    const updatedNote = db.prepare("SELECT * FROM notes WHERE id = ?").get(id);
    res.json(formatNote(updatedNote));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.put("/:id/complete", async (req, res) => {
  const { id } = req.params;
  try {
    const note = db.prepare("SELECT * FROM notes WHERE id = ?").get(id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    const newValue = note.completed ? 0 : 1;
    db.prepare("UPDATE notes SET completed = ? WHERE id = ?").run(
      newValue,
      note.id
    );
    const updatedNote = db.prepare("SELECT * FROM notes WHERE id = ?").get(id);
    res.json(formatNote(updatedNote));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const note = db.prepare("SELECT * FROM notes WHERE id = ?").get(id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    db.prepare("DELETE FROM notes WHERE id = ?").run(note.id);
    res.status(200).json({ message: "Note deleted", id: Number(id) });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
