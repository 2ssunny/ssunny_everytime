import React, { useState, useEffect } from "react";
import "./Register.css";

import axios from "axios";

import { Navigation } from "../../navigation.js";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [duplicate, setDuplicate] = useState(true);
  const [emailVerify, setEmailVerify] = useState(false);
  const [serverVerificationCode, setServerVerificationCode] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const { handleClickHome } = Navigation();

  useEffect(() => {
    console.log(serverVerificationCode);
  }, [serverVerificationCode]);

  const checkDuplicate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/checkDuplicate",
        { email, username }
      );
      if (response.data.duplicate === "noneDuplicate") {
        alert("You can use the email and username");
        setDuplicate(false);
      } else {
        alert(response.data.duplicate);
      }
    } catch (error) {
      console.error("An error occurred while checking for duplicates:", error);
    }
  };

  const sendVerifyEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/sendVerificationEmail",
        { email }
      );
      setServerVerificationCode(response.data.verifyCode);
      alert("Verification email sent");
      console.log(response.data.verifyCode);
    } catch (error) {
      console.error(
        "An error occurred while sending the verification email:",
        error
      );
    }
  };

  const verifyEmail = (e) => {
    e.preventDefault();
    if (String(verificationCode) === String(serverVerificationCode)) {
      alert("Email verified");
      setEmailVerify(true);
    } else {
      alert("Invalid verification code");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and confirm password do not match");
      return;
    }
    if (duplicate === true) {
      alert("Please check duplicate first");
      return;
    }
    if (emailVerify === false) {
      alert("Please verify your email");
      return;
    }
    if (
      password === confirmPassword &&
      duplicate === false &&
      emailVerify === true
    ) {
      const response = await axios.post("http://localhost:8000/register", {
        email,
        password,
        username,
      });
      if (response.data.message === "success") {
        alert("Register success");
        handleClickHome();
      } else {
        alert("Register failed");
      }
    }
  };

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
            <button onClick={checkDuplicate}>Check Duplicate</button>
            <br></br>
            <p className="space"></p>
            <button className="register_emailVerify" onClick={sendVerifyEmail}>
              Send verify email
            </button>
            <br></br>
            <label className="registerBox_Text">
              Verify Code:
              <br></br>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
              <button onClick={verifyEmail}>Verify</button>
            </label>
            <button className="register_button" onClick={handleRegister}>
              register
            </button>
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
