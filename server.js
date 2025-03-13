const express = require("express");
const cors = require("cors");
const app = express();
const bcrypt = require("bcryptjs");
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
const diconfig = require("./db");
const eventsroute = require("./routes/eventsroute");
const userRoute = require("./routes/userRoute");
app.use(express.json());
app.use("/api/events", eventsroute);
app.use("/api/users", userRoute);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on ${port}`));
//1Usx1P5scWpEd4tV
