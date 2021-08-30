const mongoose = require("mongoose");

const Favoris = mongoose.model("Favoris", {
  name: String,
  description: String,
  image: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
