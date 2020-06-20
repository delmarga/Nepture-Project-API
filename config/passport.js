const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const db = require("../database");
const bcrypt = require("bcrypt");

// Local Strategy using email and password
passport.use(
  new localStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        // Search for email in database
      } catch {}
    }
  )
);
