const express = require('express');
const router  = express.Router();
const Room = require("../models/room");

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

const loginCheck = () => {
  return (req, res, next) => (req.session.user ? next() : res.redirect("/login"));
};


router.get("/private", loginCheck(), (req, res) => {
  const user = req.session.user;
  res.render("content/private", { user });
});

// Get all rooms from DB and show in roomPartials
router.get("/rooms", (req, res, next) => {
  Room.find()
  .populate("owner")
  .then(allRoomsfromDB => {
    console.log(allRoomsfromDB);
    res.render("rooms/rooms", { rooms: allRoomsfromDB });
  })
  .catch(err => next(err));
});

module.exports = router;
