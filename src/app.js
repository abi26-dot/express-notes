import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import noteRoute from "./routes/notes.route.js";

dotenv.config();

const app = express();

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "views/register.html"));
});

// Serve login.html (corrected path)
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "auth", "login.html"));
});

// API routes
app.use("/api/note", noteRoute);

// Middleware
app.use(notFound);
app.use(errorHandler);

export default app;
