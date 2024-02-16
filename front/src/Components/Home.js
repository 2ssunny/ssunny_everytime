import React from "react";

import "./Home.css";

const nowHomeUsername = localStorage.getItem("Username");

function App() {
  return (
    <div>
      <header className="home_header">
        <h1 className="home_text">
          {nowHomeUsername ? (
            <p>Welcome, {nowHomeUsername}</p>
          ) : (
            <p>Welcome. Login to use all features.</p>
          )}
        </h1>
      </header>
    </div>
  );
}

export default App;
