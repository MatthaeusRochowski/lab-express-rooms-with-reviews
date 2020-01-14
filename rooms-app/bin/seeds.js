const mongoose = require('mongoose');
const Room = require('../models/room');

const dbName = 'rooms-app';
mongoose.connect(`mongodb://localhost/${dbName}`);


const rooms = [
    {
        name: "Room Ingolstadt",
        description: "Nice Room next to Westpark",
        imageUrl: "",
        owner: "5e1c7df87f88473fb4ae8885"
    },
    {
        name: "Room Munich",
        description: "Nice Room next to Hauptbahnhof",
        imageUrl: "",
        owner: "5e1c7df87f88473fb4ae8885"
    },
    {
        name: "Room Erfurt",
        description: "Nice Room in Erfurt Altstadt",
        imageUrl: "",
        owner: "5e1c7df87f88473fb4ae8885"
    },
];

Room.create(rooms, (err) => {
    if (err) { throw (err) }
    console.log(`Created ${rooms.length} rooms`)
    mongoose.connection.close();
});