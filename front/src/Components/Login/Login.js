import React, { useState } from "react";
import "./Login.css";

import { Navigation } from "../../navigation.js";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleClickHome, handleClickRegister } = Navigation();

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
            <button className="login_button">Login</button>
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