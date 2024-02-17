import React from "react";

import "./Home.css";

const nowHomeUsername = localStorage.getItem("Username");

function App() {
  return (
    <div>
      <header className="home_header">
        {nowHomeUsername ? (
          <h1 className="home_text">
            Welcome, "{nowHomeUsername}"! You are now logged in.
          </h1>
        ) : (
          <h1 className="home_text">Welcome. Login to use all features.</h1>
        )}
      </header>
    </div>
  );
}

export default App;
