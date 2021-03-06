const express = require("express");
const router = express.Router();
const axios = require("axios");
const { response } = require("express");

const apiKey = process.env.REACTEUR_KEY;

router.get("/comics", async (req, res) => {
  const { limit = 100, title, page = 1 } = req.query;
  queryTitle = title && "&title=" + title;

  const query = `?apiKey=${apiKey}&limit=${limit}&skip=${
    limit * (page - 1)
  }${queryTitle}`;
  console.log(query);
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics${query}`
    );

    // Sorting the result

    const tmp = response.data.results.sort((a, b) => {
      return a.title.toLowerCase() - b.title.toLowerCase();
    });
    response.data.comics = tmp;
    res.status(200).json(response.data);
    // console.log(response.data);
  } catch (error) {
    console.log(error);
  }

  // res.status(200).json(response.data);
});

router.get("/comics/:id", async (req, res) => {
  const id = req.params.id;

  const query = `${id}/?apiKey=${apiKey}`;
  console.log(query);
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${query}`
    );
    res.status(200).json(response.data);
    console.log(response.data);
  } catch (error) {}

  res.status(200).json(response.data);
});

module.exports = router;
