const express = require("express");
const router = express.Router();
const Booking = require("../models/bookings");

router.post("/bookevent", async (req, res) => {
  const { event, userid, ondate, totalamount } = req.body;

  if (!event || !userid || !ondate || !totalamount) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  try {
    const newBooking = new Booking({
      event: event.name,
      eventid: event.id,
      userid,
      ondate,
      totalamount,
      transactionid: "1234",
    });

    const savedBooking = await newBooking.save();
    res.send("Room booked successfully!");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
