const express = require("express");
const router = express.Router();
const Booking = require("../models/bookings");
const Event = require("../models/events");

router.post("/bookevent", async (req, res) => {
  const {
    userid,
    username,
    eventid,
    event,
    ondate,
    totalamount,
    transactionid,
  } = req.body;

  console.log("Booking request received:", req.body);

  if (
    !userid ||
    !username ||
    !eventid ||
    !event ||
    !ondate ||
    !totalamount ||
    !transactionid
  ) {
    console.log("Missing fields in request");
    return res.status(400).json({ error: "All fields are required!" });
  }

  try {
    const newBooking = new Booking({
      userid,
      username,
      eventid,
      event,
      ondate: new Date(ondate), // ✅ fixed date
      totalamount: Number(totalamount),
      transactionid,
    });

    const savedBooking = await newBooking.save();

    const eventtemp = await Event.findOne({ _id: eventid });

    eventtemp.currentbookings.push({
      bookingid: savedBooking._id, // ✅ booking ID, not event ID
      ondate: new Date(ondate),
      status: "booked", // ✅ fixed status
    });

    await eventtemp.save();

    console.log("Booking saved successfully:", savedBooking);
    return res.status(200).json({
      message: "Booking successful",
      savedBooking,
    });
  } catch (error) {
    console.error("🔥 Error saving booking:", error.message);
    return res.status(500).json({ error: "Failed to save booking" });
  }
});

module.exports = router;
