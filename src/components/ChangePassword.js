// ChangePassword.js
import React, { useState, useRef, useEffect } from "react";
import { getAuth, updatePassword, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

function ChangePassword() {
  const nav = useNavigate();
  const [pw1, setPw1] = useState("");
  const [pw2, setPw2] = useState("");
  const [msg, setMsg] = useState("");
  const rPw1 = useRef();
  const rPw2 = useRef();

  useEffect(() => {
    const un = localStorage.getItem("un");
    if (un === null) {
      nav("/login");
    }
  }, [nav]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (pw1 === pw2) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          updatePassword(user, pw1)
            .then(() => {
              localStorage.removeItem("un");
              nav("/login");
            })
            .catch((err) => setMsg("Issue: " + err.message));
        }
      });
    } else {
      setMsg("Passwords do not match");
      setPw1("");
      setPw2("");
      rPw1.current.focus();
    }
  };

  return (
    <div className="content-wrapper">
      <NavBar />
      <div className="center">
        <div className="form-container">
          <h1>Change Password</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="Enter new Password"
              onChange={(e) => setPw1(e.target.value)}
              ref={rPw1}
              value={pw1}
              required
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              onChange={(e) => setPw2(e.target.value)}
              ref={rPw2}
              value={pw2}
              required
            />
            <input type="submit" value="Change Password" />
          </form>
          {msg && <p className="error-message">{msg}</p>}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ChangePassword;