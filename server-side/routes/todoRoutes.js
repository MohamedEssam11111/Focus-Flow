import express from "express";
import {
  createToDo,
  getToDos,
  getToDo,
  updateToDo,
  deleteToDo,
} from "../controllers/todoController.js";

const router = express.Router();

router.post("/", createToDo);
router.get("/", getToDos);
router.get("/:id", getToDo);
router.patch("/:id", updateToDo);
router.delete("/:id", deleteToDo);

export default router;
