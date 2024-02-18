import React from "react";

import "./Nav.css";
import logo from "../media/logo_transparent.png";

import { Navigation } from "../navigation.js";

function App() {
  const {
    handleClickHome,
    handleClickAbout,
    handleClickLogin,
    handleClickTimetableCheck,
    handleClickBoard,
  } = Navigation();

  const handleLogout = () => {
    localStorage.removeItem("Username");
    window.location.reload();
    alert("Logout successful");
  };

  const nowNavUsername = localStorage.getItem("Username");

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
        {/* <span className="nav_text" onClick={handleClickTimetableCheck}>
          Timetable
        </span> */}
        <span className="nav_text" onClick={handleClickBoard}>
          Board
        </span>

        {nowNavUsername ? (
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
