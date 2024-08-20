// ForgotPassword.js
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import NavBar from "./NavBar";
import Footer from "./Footer";

function ForgotPassword() {
  const nav = useNavigate();
  const [un, setUn] = useState("");
  const [msg, setMsg] = useState("");
  const rUn = useRef();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("un");
    if (loggedInUser) {
      nav("/home");
    }
  }, [nav]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const auth = getAuth();
    sendPasswordResetEmail(auth, un)
      .then(() => {
        setMsg("Password reset email sent. Please check your inbox.");
        setTimeout(() => nav("/login"), 3000);
      })
      .catch((err) => setMsg("Issue: " + err.message));
  };

  return (
    <div className="content-wrapper">
      <NavBar />
      <div className="center">
        <div className="form-container">
          <h1>Forgot Password</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter registered email"
              onChange={(e) => setUn(e.target.value)}
              ref={rUn}
              value={un}
              required
            />
            <input type="submit" value="Send Reset Email" />
          </form>
          {msg && <p className="info-message">{msg}</p>}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ForgotPassword;