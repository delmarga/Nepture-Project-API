const express = require("express");
const router = express.Router();
const db = require("../../database");

// List All Users
router.get("/", (req, res) => {
  res.send("List of all users");
});

module.exports = router;
