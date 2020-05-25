const express = require("express");
const router = express.Router();
const db = require("../../database");
const bcrypt = require("bcrypt");

// List All Users (GET)
router.get("/", (req, res) => {
  db.select()
    .from("users")
    .orderBy("id")
    .then((users) => {
      res.json(users);
    });
});

// Get User By ID
router.get("/:id", (req, res) => {
  db("users")
    .where({ id: req.params.id })
    .first()
    .then((user) => {
      res.json(user);
    });
});

// Register User (CREATE)
router.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    db("users")
      .insert({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
      })
      .returning("*")
      .then((user) => {
        res.json(user);
      });
  } catch {
    res.status(500).send();
  }
});

module.exports = router;
