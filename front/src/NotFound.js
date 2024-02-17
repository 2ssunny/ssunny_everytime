import React from "react";

import "./NotFound.css";

import { Navigation } from "./navigation";

function App() {
  const { handleClickHome } = Navigation();

  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Page not found</p>
      <button onClick={handleClickHome}>Go to Home</button>
    </div>
  );
}

export default App;
