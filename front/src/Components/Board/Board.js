import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Board.css";

import { Navigation } from "../../navigation.js";

const nowBoardUsername = localStorage.getItem("Username");

function App() {
  const [boardData, setBoardData] = useState([]);

  const { handleClickBoardPost } = Navigation();
  useEffect(() => {
    axios.get("http://localhost:8000/boardList", {}).then((res) => {
      setBoardData(res.data);
    });
  }, []);

  return (
    <div className="board">
      <h1>Board</h1>
      {nowBoardUsername ? (
        <button className="boardWrite" onClick={handleClickBoardPost}>
          Write
        </button>
      ) : (
        <p>Login to post</p>
      )}
      <div className="BoardItem">
        {boardData.map((data, index) => {
          return (
            <div key={index} className="boardList">
              <div className="BoardList_contents">
                <p className="boardListTitle">{data.BOARD_TITLE}</p>
                <p className="boardListId">Written by {data.REGISTER_ID}</p>
                <p className="boardListDate">
                  Uploaded at {data.REGISTER_DATE}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
