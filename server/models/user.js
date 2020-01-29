const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  subscribedTags: [String],
  bio: String,
  notifications: Array, 
  likedPosts : [],
  likedComments: [],
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
