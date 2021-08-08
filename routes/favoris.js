const express = require("express");
const router = express.Router();
const axios = require("axios");
const { response } = require("express");

const apiKey = "H8NZZaBE8yYMcA5d";

// const isAuthenticated = require("../middlewares/isAuthenticated");

router.post("/favoris", async (req, res) => {
  const comics = req.fields.data.comics;
  const characters = req.fields.data.characters;
  console.log(comics);

  let tmpComics = [];

  let found = 0;

  try {
    let responseComics = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${apiKey}`
    );
    const max = Math.round(responseComics.data.count / 100);

    // console.log(responseComics);
    tmpComics.push(
      responseComics.data.results.filter((elem) => {
        if (comics.includes(elem._id)) {
          found++;
          return true;
        }
        return false;
      })
    );

    console.log(max);
    console.log(found);

    for (let skip = 100; skip <= max * 100; skip += 100) {
      console.log("2 eme boucle for" + skip);

      let responseComics = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${apiKey}&skip={skip}`
      );
      tmpComics.push(
        responseComics.data.results.filter((elem) => {
          if (comics.includes(elem._id)) {
            found++;
            return comics.includes(elem._id);
          }
          return false;
        })
      );
    }

    console.log(tmpComics);

    res.status(200).json(response.data);
    // console.log(response.data);
  } catch (error) {}
});

module.exports = router;
