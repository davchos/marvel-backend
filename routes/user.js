const express = require("express");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const router = express.Router();

router.post("/login", (req, res) => {
  // const {} req.fields
});
router.post("/signup", (req, res) => {});
router.post("/addfavoris", (req, res) => {});

module.exports = router;
