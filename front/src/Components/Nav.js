import React from "react";

import "./Nav.css";
import logo from "../media/logo_transparent.png";

import { Navigation } from "../navigation.js";

function App() {
  const {
    handleClickHome,
    handleClickAbout,
    handleClickLogin,
    handleClickBoard,
    handleClickScheduleCheck,
  } = Navigation();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
    alert("Logout successful");
  };

  const nowNavUsername = localStorage.getItem("Username");
  const nowNavUsernameSession = sessionStorage.getItem("Username");

  const username = nowNavUsername || nowNavUsernameSession;
  return (
    <div>
      <header className="nav_header">
        <img
          src={logo}
          className="nav_logo"
          alt="logo"
          onClick={handleClickHome}
        />
        <span className="nav_text" onClick={handleClickAbout}>
          About
        </span>
        <span className="nav_text" onClick={handleClickScheduleCheck}>
          Schedule
        </span>
        <span className="nav_text" onClick={handleClickBoard}>
          Board
        </span>

        {username ? (
          <span className="nav_text" onClick={handleLogout}>
            Logout
          </span>
        ) : (
          <span className="nav_text" onClick={handleClickLogin}>
            Login
          </span>
        )}
      </header>
    </div>
  );
}

export default App;
