import React from "react";

import "./Home.css";

const nowHomeUsername = localStorage.getItem("Username");
const nowHomeUsernameSession = sessionStorage.getItem("Username");

function App() {
  const username = nowHomeUsername || nowHomeUsernameSession;
  return (
    <div>
      <header className="home_header">
        {username ? (
          <h1 className="home_text">
            Welcome, "{username}"! You are now logged in.
          </h1>
        ) : (
          <h1 className="home_text">Welcome. Login to use all features.</h1>
        )}
      </header>
    </div>
  );
}

export default App;
