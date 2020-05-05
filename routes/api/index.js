const express = require("express");
const router = express.Router();
const usersRoute = require("./users");

// Dashboard Route
router.get("/", (req, res) => {
  res.send("Dashboard");
});

// User Routes
router.use("/users", usersRoute);

module.exports = router;
