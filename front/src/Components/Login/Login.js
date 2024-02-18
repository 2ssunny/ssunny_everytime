import React, { useState } from "react";
import "./Login.css";

import { Navigation } from "../../navigation.js";

import axios from "axios";
function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleClickHome, handleClickRegister } = Navigation();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await axios.post(`${process.env.REACT_APP_SERVER}/login`, {
      email,
      password,
    });
    if (response.data.message === "success") {
      localStorage.setItem("Username", response.data.username);
      alert("Login successful. Going to the home page.");

      window.location.href = "/";
    } else {
      alert("Login failed. Check your email and password.");
    }
  };

  return (
    <div className="login">
      <header className="login_header">
        <h1 className="login_text">Welcome to the login page!</h1>
      </header>
      <div className="loginPageBox">
        <div className="loginBox">
          <form>
            <label className="loginBox_Text">
              E-mail:
              <br></br>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <p className="space"></p>
            <label className="loginBox_Text">
              Password:
              <br></br>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <p className="space"></p>
            <button className="login_button" onClick={handleLogin}>
              Login
            </button>
          </form>
        </div>
        <div className="login_registerLink">
          <span>Don't have an account? Click here to Register!</span>
          <button
            className="login_RegisterButton"
            onClick={handleClickRegister}
          >
            Register
          </button>
        </div>
        <div className="login_homeLink">
          <button className="login_HomeButton" onClick={handleClickHome}>
            Home
          </button>
        </div>
      </div>
    </div>
  );
}
export default App;
