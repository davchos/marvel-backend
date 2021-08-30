const express = require("express");
const router = express.Router();
const axios = require("axios");
const { response } = require("express");

const apiKey = process.env.REACTEUR_KEY;

router.get("/characters", async (req, res) => {
  const { limit = 100, name, page = 1 } = req.query;
  const queryTitle = name && "&name=" + name;

  const query = `?apiKey=${apiKey}&limit=${limit}&skip=${
    limit * (page - 1)
  }${queryTitle}`;

  console.log(query);
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters${query}`
    );

    const tmp = response.data.results.sort((a, b) => {
      return a.name.toLowerCase() - b.name.toLowerCase();
    });

    response.data.results = tmp;
    res.status(200).json(response.data);
  } catch (error) {}
});

module.exports = router;
