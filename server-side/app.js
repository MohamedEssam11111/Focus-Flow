import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
dotenv.config(); // Load .env variables
connectDB(); // Connect to MongoDB
import Post from "./models/Post.js";
import { fileURLToPath } from "url";
import path from "path";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(
  cors({
    origin: "http://localhost:5000",
    credentials: true,
  }),
);
const PORT = process.env.PORT || 5000;

app.use(express.json()); // عشان نقرأ JSON من الـ requests
app.use(express.urlencoded({ extended: true })); // عشان نقرأ form data من الـ requests

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/test.html");
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/`);
});

app.post("/posts", async (req, res) => {
  try {
    const newPost = new Post(req.body); // Create a new post from request body
    await newPost
      .save()
      .then(() => {
        res.redirect("/"); // Redirect back to the homepage after saving
      })
      .catch((err) => {
        console.error(err);
        alert("Error saving post: " + err.message); // Show an alert with the error message
        res.status(400).json({ error: err.message }); // Return an error message with a 400 status
      });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message }); // Return an error message with a 400 status
  }
});
// Express server setup summary:
// 1. const app = express(); → creates an Express app instance (your server object).
// 2. app.use(express.json()); → middleware to parse JSON in requests so req.body works.
// 3. app.get("/", ...) → defines a route; when visiting "/", send back test.html.
// 4. app.listen(PORT, ...) → starts the server, listens on a port (from .env or default 5000).
// Notes: process.env.PORT is set by hosting services (Render, Heroku, etc.) in production.
// Without app.listen, the server won't run or respond to requests.
