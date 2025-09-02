import express from "express";
import bodyParser from "body-parser";
import {
  createNote,
  viewNote,
  updateNote,
  deleteNote,
  listNotes,
} from "./controllers/note.controller.js";

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Routes
app.post("/notes/create", createNote);          // Create note
app.get("/notes/list", listNotes);             // List all notes
app.get("/notes/view/:id", viewNote);          // View a note by ID
app.put("/notes/update/:id", updateNote);      // Update a note by ID
app.delete("/notes/delete/:id", deleteNote);   // Delete a note by ID

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to Express Notes API 🚀. Use /notes to get started.");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
