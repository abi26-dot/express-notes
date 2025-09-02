import prisma from "../config/prisma.config.js";

// Create a note (no change)
export const createNote = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Please enter all fields",
      });
    }

    const createNote = await prisma.notes.create({
      data: { name, body: description },
    });

    return res.status(201).json({ success: true, data: createNote });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// View a single note (use body)
export const viewNote = async (req, res) => {
  try {
    const noteId = parseInt(req.params.id);

    if (isNaN(noteId)) {
      return res.status(400).json({ success: false, message: "Note ID must be a number" });
    }

    const note = await prisma.notes.findUnique({ where: { id: noteId } });
    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    return res.status(200).json({ success: true, data: note });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Update a note (use body)
export const updateNote = async (req, res) => {
  try {
    const noteId = parseInt(req.params.id);
    const { name, description } = req.body;

    if (isNaN(noteId) || !name || !description) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const note = await prisma.notes.findUnique({ where: { id: noteId } });
    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    const updateNote = await prisma.notes.update({
      where: { id: noteId },
      data: { name, body: description },
    });

    return res.status(200).json({ success: true, data: updateNote });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a note (use body)
export const deleteNote = async (req, res) => {
  try {
    const noteId = parseInt(req.params.id);

    if (isNaN(noteId)) {
      return res.status(400).json({ success: false, message: "Note ID must be a number" });
    }

    const note = await prisma.notes.findUnique({ where: { id: noteId } });
    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    const deleteNote = await prisma.notes.delete({ where: { id: noteId } });
    return res.status(200).json({ success: true, data: deleteNote });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// List all notes (no change)
export const listNotes = async (req, res) => {
  try {
    const notes = await prisma.notes.findMany();
    return res.status(200).json({ success: true, data: notes });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
