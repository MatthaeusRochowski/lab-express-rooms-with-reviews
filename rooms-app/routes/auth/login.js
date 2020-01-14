const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../../models/User");

router.get("/", (req, res, next) => {
    console.log("inside login route");
    res.render("auth/login");
  });

  router.post("/", (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email, password);
    if (email === "" || password === "") {
      res.render("auth/login", {
        errorMessage: "Please enter both, username and password to sign up."
      });
      return;
    }
  
    User.findOne({ email: email})
      .then(user => {
          console.log(user);
        if (!user) {
          res.render("auth/login", {
            errorMessage: "The username doesn't exist."
          });
          return;
        }
        if (bcrypt.compareSync(password, user.password)) {
            req.session.currentUser = user;
            console.log('session opened', req.session );// Save the login in the session!
            return res.render("rooms/private", { user });
        } else {
          res.render("auth/login", {
            errorMessage: "Incorrect password"
          });
        }
      })
      .catch(error => {
        next(error);
      });
  });

module.exports = router;