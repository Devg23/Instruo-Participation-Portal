const mongoose = require("mongoose");

var mongoURL =
  "mongodb+srv://devashishg996:1Usx1P5scWpEd4tV@cluster0.8ihp8.mongodb.net/mern-ticketmaster";

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

var connection = mongoose.connection;

connection.on("error", () => {
  console.log("MongoDB connection Failed");
});

connection.on("connected", () => {
  console.log("MongoDB connection Successful");
});

module.exports = mongoose;
