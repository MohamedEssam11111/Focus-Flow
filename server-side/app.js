import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
dotenv.config(); // Load .env variables
connectDB(); // Connect to MongoDB
import { fileURLToPath } from "url";
import path from "path";
import cors from "cors";
import todoRoutes from "./routes/todoRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
const PORT = process.env.PORT || 5000;

app.use(express.json()); // عشان نقرأ JSON من الـ requests
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/`);
});

app.use("/api/todos", todoRoutes);
