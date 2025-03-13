import React, { useState } from "react";
import "./Loginscreen.css";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";

function Loginscreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  async function login() {
    const user = { email, password };
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        user
      );
      console.log(response.data);
      localStorage.setItem("currentUser", JSON.stringify(response.data));
      setLoading(false);
      setSuccess(true);
      window.location.href = "/home";
    } catch (error) {
      console.error(
        "Login Error:",
        error.response?.data?.message || error.message
      );
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
          <b>Login</b>
        </h1>
        {loading && <Loader />}
        {error && <Error message="Login Failed" />}
        {success && <Success message="Login Successful" />}
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="form-control mb-4"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-primary w-100" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Loginscreen;
