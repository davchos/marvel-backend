const mongoose = require("mongoose");

const User = mongoose.model("User", {
  name: String,
  age: String,
});
