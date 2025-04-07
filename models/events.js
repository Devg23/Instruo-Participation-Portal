const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    fees: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imageurls: [],
    currentbookings: [
      {
        bookingid: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "bookings",
        },
        ondate: {
          type: Date,
        },
        status: {
          type: String,
        },
      },
    ],
    date: {
      type: Date,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const eventModel = mongoose.model("events", eventSchema);

module.exports = eventModel;
