import React, { useState } from "react";
import "./Register.css";

import { Navigation } from "../../navigation.js";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");

  const { handleClickHome } = Navigation();

  return (
    <div className="register">
      <header className="register_header">
        <h1 className="register_text">Welcome to the register page!</h1>
      </header>
      <div className="registerPageBox">
        <div className="registerBox">
          <form className="register_form">
            <label className="registerBox_Text">
              E-mail:
              <br></br>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <br></br>
            <p className="space"></p>
            <label className="registerBox_Text">
              Password:
              <br></br>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <p className="space"></p>
            <label className="registerBox_Text">
              Confirm Password:
              <br></br>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
            <p className="space"></p>
            <label className="registerBox_Text">
              Username:
              <br></br>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <br></br>
            <p className="space"></p>
            <button className="register_emailVerify">Send verify email</button>
            <br></br>
            <label className="registerBox_Text">
              Verify Code:
              <br></br>
              <input type="text" id="emailVerify" name="emailVerify" />
            </label>
            <button className="register_button">register</button>
          </form>
        </div>
        <div className="register_homeLink">
          <button className="register_HomeButton" onClick={handleClickHome}>
            Home
          </button>
        </div>
      </div>
    </div>
  );
}
export default App;
