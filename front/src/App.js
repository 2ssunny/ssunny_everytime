import { Routes, Route, BrowserRouter } from "react-router-dom";

import Nav from "./Components/Nav.js";
import Home from "./Components/Home.js";
import About from "./Components/About.js";
import Register from "./Components/Login/Register.js";
import Login from "./Components/Login/Login.js";
import BoardList from "./Components/Board/Board.js";
import BoardView from "./Components/Board/BoardView.js";
import BoardPost from "./Components/Board/BoardPost.js";
import BoardEdit from "./Components/Board/BoardEdit.js";
import ScheduleCheck from "./Components/Scheduler/ScheduleCheck.js";
import ScheduleUpload from "./Components/Scheduler/ScheduleUpload.js";
import ScheduleView from "./Components/Scheduler/ScheduleView.js";
import NotFound from "./NotFound.js";

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
        <Route path="schedule">
          <Route path="" element={<ScheduleCheck />} />
          <Route path="view/:scheduleId" element={<ScheduleView />} />
          <Route path="upload" element={<ScheduleUpload />} />
        </Route>
        <Route path="board">
          <Route path="" element={<BoardList />} />
          <Route path="view/:boardId" element={<BoardView />} />
          <Route path="edit/:boardId" element={<BoardEdit />} />
          <Route path="post" element={<BoardPost />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
