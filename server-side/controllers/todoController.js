import ToDo from "../models/ToDoModel.js";
export const createToDo = async (req, res) => {
  try {
    const newToDo = new ToDo(req.body);
    res.status(201).json(await newToDo.save());
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
//get all todos
export const getToDos = async (req, res) => {
  try {
    const todos = await ToDo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getToDo = async (req, res) => {
  try {
    const todo = await ToDo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "ToDo not found" });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateToDo = async (req, res) => {
  try {
    const updatedToDo = await ToDo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedToDo) {
      return res.status(404).json({ message: "ToDo not found" });
    }
    res.status(200).json(updatedToDo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteToDo = async (req, res) => {
  try {
    const deletedToDo = await ToDo.findByIdAndDelete(req.params.id);
    if (!deletedToDo) {
      return res.status(404).json({ message: "ToDo not found" });
    }
    res.status(200).json(deletedToDo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
