import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";

function BookingScreen() {
  const { eventid } = useParams(); // Extract eventid from URL
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [event, setEvent] = useState(null); // Start with null for safety

  useEffect(() => {
    if (eventid) {
      const fetchEvent = async () => {
        try {
          setLoading(true);
          const { data } = await axios.post("/api/events/geteventbyid", {
            eventid,
          });
          setEvent(data);
          setLoading(false);
        } catch (err) {
          setLoading(false);
          setError(true);
        }
      };
      fetchEvent();
    }
  }, [eventid]); // Add eventid as a dependency

  if (!eventid) {
    // Show a message if no eventid is provided
    return <h1>No Event Selected</h1>;
  }

  return (
    <div className="m-5">
      {loading ? (
        <h1>
          <Loader />
        </h1>
      ) : event ? ( // Only render if event exists
        <div>
          <div className="row justify-content-center mt-5 bs">
            <div className="col-md-6">
              <h1>{event?.name}</h1>
              <hr />
              <img
                src={event?.imageurls}
                className="bigimg"
                alt={event?.name}
              />
            </div>
            <div className="col-md-6">
              <i>
                <h1>Booking Details</h1>
              </i>
              <hr />
              <div style={{ textAlign: "right" }}>
                <b>
                  <p>Name : </p>
                  <p>Type : </p>
                  <p>Date : </p>
                  <p>Participants : </p>
                </b>
              </div>
              <div></div>
              <i>
                <h2>Amount</h2>
              </i>
              <hr />
              <div style={{ textAlign: "right" }}>
                <b>
                  <p>Event date : {event.date}</p>
                  <p>Fees per head : {event.fees}</p>
                  <p>Total fees : </p>
                </b>
              </div>
              <div style={{ float: "right" }}>
                <button className="btn btn-primary">Pay now</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default BookingScreen;
