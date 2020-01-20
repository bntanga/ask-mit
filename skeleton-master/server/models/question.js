const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema({
  creatorName: String,  
  creatorId: String,
  time: String,
  content: String,
  likes: Number,
  postTags: Array,
});

// compile model from schema
module.exports = mongoose.model("story", StorySchema);