import axios from "axios";
const API_URL = "http://localhost:5000/api/todos";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
// get all todos /api/todos
// get todo by id /api/todos/:id
// create todo /api/todos
// update todo /api/todos/:id
// delete todo /api/todos/:id
const getTodos = async () => {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};

const getTodoById = async (id) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching todo with id ${id}:`, error);
    throw error;
  }
};

const createTodo = async (todoData) => {
  try {
    const response = await api.post("/", todoData);
    return response.data;
  } catch (error) {
    console.error("Error creating todo:", error);
    throw error;
  }
};

const updateTodo = async (id, todoData) => {
  try {
    const response = await api.patch(`/${id}`, todoData);
    return response.data;
  } catch (error) {
    console.error(`Error updating todo with id ${id}:`, error);
    throw error;
  }
};

const deleteTodo = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting todo with id ${id}:`, error);
    throw error;
  }
};
export { getTodos, getTodoById, createTodo, updateTodo, deleteTodo };
