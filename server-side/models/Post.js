import mongoose from "mongoose";
import { Schema } from "mongoose";

const PostSchema = new Schema({
  title: { type: String, required: true },
});

const post = mongoose.model("Post", PostSchema);

export default post;
