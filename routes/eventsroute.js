const express = require("express");
const router = express.Router();

const Event = require("../models/events");

// Get all events
router.get("/getallevents", async (req, res) => {
  try {
    const events = await Event.find({}); // Fetch all events from the database
    res.status(200).send(events); // Send a successful response
  } catch (error) {
    console.error("Error fetching all events:", error); // Log the error for debugging
    res.status(500).json({ message: "Internal Server Error" }); // Return a safe error message
  }
});

// Get event by ID
router.post("/geteventbyid", async (req, res) => {
  const eventid = req.body.eventid; // Extract the correct field sent from the frontend
  try {
    const event = await Event.findOne({ _id: eventid }); // Fetch the event by ID
    if (!event) {
      // Check if the event exists
      return res.status(404).json({ message: "Event not found" }); // Return a 404 if not found
    }
    res.status(200).send(event); // Send the event details
  } catch (error) {
    console.error("Error fetching event by ID:", error); // Log the error for debugging
    res.status(500).json({ message: "Internal Server Error" }); // Return a safe error message
  }
});

module.exports = router;
