const express = require("express");
const router = express.Router();
const Room = require("../models/room");
const mongoose = require("mongoose");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

const loginCheck = () => {
  return (req, res, next) =>
    req.session.currentUser ? next() : res.redirect("/login");
};

router.get("/private", loginCheck(), (req, res) => {
  const user = req.session.currentUser;
  res.render("rooms/private", { user });
});

// Get all rooms from DB and show in roomPartials
router.get("/rooms", (req, res, next) => {
  const user = req.session.currentUser;
  Room.find()
    .populate("owner")
    .then(allRoomsfromDB => {
      //console.log(allRoomsfromDB);
      res.render("rooms/rooms", { rooms: allRoomsfromDB, user });
    })
    .catch(err => next(err));
});

// Get Form to create a new Room and Create a Room
router.get("/rooms/new", loginCheck(), (req, res) => {
  const user = req.session.currentUser;
  res.render("rooms/new", { user });
});

router.post("/rooms/new", loginCheck(), (req, res) => {
  const user = req.session.currentUser;
  const { name, description } = req.body;
  const newRoom = new Room({ name, description, owner: user._id });
  //console.log(newRoom);
  newRoom
    .save()
    .then(room => {
      res.redirect("/myrooms");
    })
    .catch(error => {
      res.render("rooms/new");
      next(error);
    });
});

// Get my rooms from DB and show in roomPartials
router.get("/myrooms", (req, res, next) => {
  const user = req.session.currentUser;
  Room.find({ owner: mongoose.Types.ObjectId(user._id) })
    .populate("owner")
    .then(allRoomsfromDB => {
      //console.log(allRoomsfromDB);
      res.render("rooms/myrooms", { rooms: allRoomsfromDB, user });
    })
    .catch(err => next(err));
});

// Get room edit form
router.get("/rooms/:id/edit", (req, res, next) => {
  console.log("inside Get room route - req.params ");
  Room.findById(req.params.id)
    .populate("owner")
    .then(theRoom => {
      console.log(theRoom);
      res.render("rooms/edit", { room: theRoom });
    })
    .catch(error => {
      console.log("Error while retrieving room details: ", error);
    });
});

module.exports = router;
