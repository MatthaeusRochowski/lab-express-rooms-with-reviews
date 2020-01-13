const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../models/User");

router.get("/", (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      next(err);
    } else {
      res.clearCookie("connect.sid");
      return res.render("index", {
        message: `Bis Bald!`
      });
    }
  });
});

module.exports = router;