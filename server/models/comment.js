const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  creatorName: String,
  creatorId: String,
  time: String,
  content: String,
  parentId: String,
  likes: Number,
});

// compile model from schema
module.exports = mongoose.model("comment", CommentSchema);