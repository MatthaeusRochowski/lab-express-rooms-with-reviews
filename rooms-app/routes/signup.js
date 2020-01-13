const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../models/User");

router.get("/", (req, res) => {
  res.render("auth/signup");
});

router.post("/", (req, res, next) => {
  console.log(req.body);
  const { email, password, fullName } = req.body;
  const passwordLength = 3;

  if (!email)
    return res.render("auth/signup", { message: "Email can't be empty" });

  if (!password)
    return res.render("auth/signup", { message: "Password can't be empty" });

  if (!fullName)
    return res.render("auth/signup", { message: "Full Name can't be empty" });

  if (password.length < passwordLength)
    return res.render("auth/signup", {
      message: `Password length should be not less than ${passwordLength}`
    });

  User.findOne({ email })
    .then(foundUser => {
      if (foundUser)
        return res.render("auth/signup", {
          message: `User ${foundUser.email} is already taken`
        });

      bcrypt
        .genSalt()
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({ email: email, password: hash, fullName: fullName }))
        .then(newUser => {
          console.log(newUser);
          req.session.user = newUser; // add newUser to session
          return res.render("index", {
            message: `User ${newUser.fullName} successfully signed up`
          });
        });
    })
    .catch(err => next(err));
});

module.exports = router;
