const express = require("express");
const router = express.Router();
const db = require("../../database");
const queries = require("../../database/queries");
const bcrypt = require("bcrypt");
const { orWhereNotExists } = require("../../database");
const { ExtractJwt } = require("passport-jwt");
const { json } = require("express");

// List All Users (GET)
router.get("/", async (req, res, next) => {
  try {
    const all = await queries.getUsers();
    res.json(all);
  } catch (error) {
    next(error);
  }
});

// Get User By ID
router.get("/:id", async (req, res, next) => {
  const userID = req.params.id;
  // Search for user
  try {
    const id = await queries.getUser(userID);
    if (!id) {
      res.json({
        message: "No user found",
      });
    } else {
      res.json(id);
    }
  } catch (error) {
    next(error);
  }
});

// DELETE User
router.delete("/:id", async (req, res, next) => {
  const userID = req.params.id;
  // Search for user
  try {
    const id = await queries.deleteUser(userID);
    if (!id) {
      res.json({
        message: "No user found",
      });
    } else {
      res.json({
        message: "User deleted",
      });
    }
  } catch (error) {
    next(error);
  }
});

// Register User (CREATE)
router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db("users")
      .insert({
        firstName,
        lastName,
        email,
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

// UPDATE User
router.put("/:id", (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  db("users")
    .where({ id: req.params.id })
    .update({
      firstName,
      lastName,
      email,
      password,
    })
    .returning("*")
    .then(() => {
      res.json({ message: "Updated." });
    });
});

// Login User
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.select("id", "email", "password")
    .from("users")
    .where("email", email)
    .then((data) => {
      bcrypt.compare(password, data[0].password).then((isMatch) => {
        if (isMatch) {
          res.json("Allowed.");
        } else {
          res.json("Not Allowed");
        }
      });
    });
});

module.exports = router;
