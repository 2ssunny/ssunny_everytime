import { Routes, Route, BrowserRouter } from "react-router-dom";

import Nav from "./Components/Nav.js";
import Home from "./Components/Home.js";
import About from "./Components/About.js";
import Register from "./Components/Login/Register.js";
import Login from "./Components/Login/Login.js";
import TimetableCheck from "./Components/Timetable/TimetableCheck.js";
import TimetableSet from "./Components/Timetable/TimetableSet.js";
import Board from "./Components/Board/Board.js";
import BoardPost from "./Components/Board/BoardPost.js";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="login">
          <Route path="" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="timetable">
          <Route path="" element={<TimetableCheck />} />
          <Route path="set" element={<TimetableSet />} />
        </Route>
        <Route path="board">
          <Route path="" element={<Board />} />
          <Route path="post" element={<BoardPost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
