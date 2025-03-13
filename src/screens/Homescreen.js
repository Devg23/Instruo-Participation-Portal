import React, { useState, useEffect } from "react";
import axios from "axios";
import Event from "../components/Eve";
import Loader from "../components/Loader";
import Error from "../components/Error";
import "./Homescreen.css"; // Import custom CSS for sexy designs and animations

function Homescreen() {
  const [events, setevents] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);
        const data = (await axios.get("/api/events/getallevents")).data;
        setevents(data);
        setloading(false);
      } catch (error) {
        seterror(true);
        console.log(error);
        setloading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        {loading ? (
          <h1>
            <Loader />
          </h1>
        ) : error ? (
          <Error />
        ) : (
          events.map((event) => {
            return (
              <div className="col-md-10 mt-3 fade-in" key={event._id}>
                <Event event={event} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Homescreen;
