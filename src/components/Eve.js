import React, { useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
function Eve({ event }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="row bs">
      <div className="col-md-4">
        <img src={event.imageurls[0]} className="smallimg" />
      </div>
      <div className="col-md-7 text-left">
        <h1>{event.name}</h1>

        {/* //<p> Description :{event.description}</p> */}
        <p> Type :{event.type}</p>
        <p> Fees: {event.fees}</p>
        <p> Prize: {event.price}</p>

        <p> Date:{event.date}</p>
        <div style={{ float: "right" }}>
          <Link to={`/book/${event._id}`}>
            <button className="btn btn-primary">Pay Now</button>
          </Link>
          <button className="btn btn-primary" onClick={handleShow}>
            View Details
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{event.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel prevLabel="" nextLabel="">
            {event.imageurls.map((url) => {
              return (
                <Carousel.Item>
                  <img className="d-block w-100 bigimg" src={url} />
                </Carousel.Item>
              );
            })}
          </Carousel>
          <p>{event.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Eve;
