import mongoose from "mongoose";
import { Schema } from "mongoose";

const ToDoSchema = new Schema({
  title: {
    type: String,
    required: true, // title must always exist
  },
  note: {
    type: String,
    required: false, // optional field
  },
  date: {
    type: Date,
    required: true, // you can decide if it's optional
  },
  icon: {
    type: String,
    required: true, // if you want every task to have an icon
  },
  completed: {
    type: Boolean,
    default: false, // false by default
  },
});
const ToDo = mongoose.model("ToDo", ToDoSchema);
export default ToDo;
