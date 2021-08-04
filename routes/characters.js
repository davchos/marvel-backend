const express = require("express");
const router = express.Router();
const axios = require("axios");
const { response } = require("express");

const apiKey = "H8NZZaBE8yYMcA5d";

router.get("/characters", async (req, res) => {
  const { limit = 100, name, page = 1 } = req.query;
  queryTitle = name && "&name=" + name;

  const query = `?apiKey=${apiKey}&limit=${limit}&skip=${limit * (page - 1)}
      ${queryTitle}`;
  console.log(query);
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters/${query}`
    );
    res.status(200).json(response.data);
    console.log(response.data);
  } catch (error) {}

  res.status(200).json(response.data);
});

module.exports = router;
