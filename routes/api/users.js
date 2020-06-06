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
router.post("/signup", async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const existingEmail = await db("users").where("email", email).first();
    console.log(existingEmail);

    if (!existingEmail) {
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
          res.json(user), console.log("User created!");
        });
    } else {
      next(new Error("Email in use"));
    }
  } catch {
    res.status(500).send();
  }
});

// UPDATE User
router.put("/:id", (req, res) => {
  db("users")
    .where({ id: req.params.id })
    .update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.params.password,
    })
    .returning("*")
    .then(() => {
      res.json({ message: "Updated." });
    });
});

// DELETE User
router.delete("/:id", (req, res) => {
  db("users")
    .where({ id: req.params.id })
    .del()
    .then(() => {
      res.json({ message: "Deleted." });
    });
});

// Login User
router.post("/login", (req, res) => {
  db.select("id", "email", "password")
    .from("users")
    .where("email", "=", req.body.email)
    .then((data) => {
      bcrypt.compare(req.body.password, data[0].password).then((isMatch) => {
        if (isMatch) {
          res.json("Allowed.");
        } else {
          res.json("Not Allowed");
        }
      });
    });
});

module.exports = router;
