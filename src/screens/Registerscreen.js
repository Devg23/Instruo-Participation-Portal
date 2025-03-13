import React, { useState } from "react";
import "./Registerscreen.css"; // Import CSS for animations
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";

function Registerscreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [message, setMessage] = useState(null); // Success/Error message
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  async function register() {
    if (!name || !email || !password || !cpassword) {
      setMessage({ type: "error", text: "All fields are required!" });
      return;
    }

    if (password !== cpassword) {
      setMessage({ type: "error", text: "Passwords do not match!" });
      return;
    }

    const user = { name, email, password };

    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:5000/api/users/register",
        user
      );
      setLoading(false);
      setSuccess(true);
      setMessage({ type: "success", text: "User registered successfully!" });

      // Clear fields after successful registration
      setName("");
      setEmail("");
      setPassword("");
      setCpassword("");
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response ? error.response.data.error : error.message,
      });
      setLoading(false);
      setError(true);
    }
  }

  return (
    <div className="animated-background d-flex align-items-center justify-content-center vh-100">
      <div
        className="card p-4 shadow-lg"
        style={{
          width: "100%",
          maxWidth: "400px",
          borderRadius: "12px",
          backgroundColor: "#eaf6ff",
        }}
      >
        <h1 className="text-center mb-4">
          <b>Register</b>
        </h1>

        {loading && <Loader />}
        {error && <Error message="Registration Failed" />}
        {success && <Success message="Registration Successful" />}
        {message && (
          <div
            className={`alert ${
              message.type === "success" ? "alert-success" : "alert-danger"
            }`}
          >
            {message.text}
          </div>
        )}

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          className="form-control mb-4"
          placeholder="Confirm Password"
          value={cpassword}
          onChange={(e) => setCpassword(e.target.value)}
        />

        <button className="btn btn-primary w-100" onClick={register}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Registerscreen;
