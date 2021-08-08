// require("dotenv").config();

const express = require("express");

const formidable = require("express-formidable");

const cors = require("cors");

// const mongoose = require("mongoose");

const app = express();

app.use(formidable());

app.use(cors());

// Database connection
const firstConnection = async () => {
  try {
    mongoose.connection
      .on("error", (err) => {
        console.error("listen on error:" + err);
      })
      .on("open", (err) => {
        dbStatus = "connected";
        console.log(`DB connected`);
      })
      .on("disconnected", (err) => {
        dbStatus = "disconnected";
        console.log(`DB disconnected`);
      });
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  } catch (error) {
    console.error("Error in starting the connection" + error);
  }
};
// firstConnection();

// routes
// Doc
const comicsRoutes = require("./routes/comics");
const charactersRoutes = require("./routes/characters");
const favorisRoutes = require("./routes/favoris");
app.use(comicsRoutes);
app.use(charactersRoutes);
app.use(favorisRoutes);

// All routes

app.all("*", (req, res) => {
  res.status(404).json({
    message: "Page not found",
  });
});

//App listen

app.listen(3000, () => {
  console.log("server started");
});
