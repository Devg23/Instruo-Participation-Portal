const express = require("express");
const cors = require("cors");
const app = express();
const bcrypt = require("bcryptjs");

// Import routes
const diconfig = require("./db");
const eventsroute = require("./routes/eventsroute");
const userRoute = require("./routes/userRoute");
const bookingsRoute = require("./routes/bookingsroute"); // ✅ Imported but not used

// Middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Routes
app.use("/api/events", eventsroute);
app.use("/api/users", userRoute);
app.use("/api/bookings", bookingsRoute); // ✅ Added this

// Server setup
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
