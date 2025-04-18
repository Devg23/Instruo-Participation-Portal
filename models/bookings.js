const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
    event: {
      type: String,
      required: true,
    },
    eventid: {
      type: String,
      required: true,
    },
    userid: {
      type: String,
      required: true,
    },
    ondate: {
      type: String,
      required: true,
    },
    totalamount: {
      type: Number,
      required: true,
    },
    transactionid: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "booked",
    },
  },
  {
    timestamps: true,
  }
);

const bookingmodel = mongoose.model("bookings", bookingSchema);
module.exports = bookingmodel;
