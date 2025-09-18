import Prisma from "../config/prisma.config.js";

// Create a note
export const createNote = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res
        .status(400)
        .send({ success: false, message: "Please enter all fields" });
    }

    const createNote = await Prisma.notes.create({
      data: { name, body: description },
    });

    return res.status(201).send({ success: true, data: createNote });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

// View a single note
export const viewNote = async (req, res) => {
  try {
    const noteId = parseInt(req.params.id);

    if (isNaN(noteId)) {
      return res
        .status(400)
        .send({ success: false, message: "Note ID must be a number" });
    }

    const note = await Prisma.notes.findUnique({
      where: { id: noteId },
    });

    if (!note) {
      return res
        .status(404)
        .send({ success: false, message: "Note not found" });
    }

    return res.status(200).send({ success: true, data: note });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

// Update a note
export const updateNote = async (req, res) => {
  try {
    const noteId = parseInt(req.params.id);
    const { name, description } = req.body;

    if (isNaN(noteId) || !name || !description) {
      return res
        .status(400)
        .send({ success: false, message: "All fields are required" });
    }

    const updateNote = await Prisma.notes.update({
      where: { id: noteId },
      data: { name, body: description },
    });

    return res.status(200).send({ success: true, data: updateNote });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

// Delete a note
export const deleteNote = async (req, res) => {
  try {
    const noteId = parseInt(req.params.id);

    if (isNaN(noteId)) {
      return res
        .status(400)
        .send({ success: false, message: "Note ID must be a number" });
    }

    const deleteNote = await Prisma.notes.delete({
      where: { id: noteId },
    });

    return res.status(200).send({ success: true, data: deleteNote });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

// List all notes
export const listNotes = async (req, res) => {
  try {
    const notes = await Prisma.notes.findMany();
    return res.status(200).send({ success: true, data: notes });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};
