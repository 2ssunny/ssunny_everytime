import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Board.css";
import { useNavigate } from "react-router-dom";

import { Navigation } from "../../navigation.js";

const nowBoardUsername = localStorage.getItem("Username");

function App() {
  const navigate = useNavigate();
  const [boardData, setBoardData] = useState([]);

  const { handleClickBoardPost } = Navigation();
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER}/boardList`, {}).then((res) => {
      setBoardData(res.data);
    });
  }, []);

  const handleBoardView = (boardId) => {
    navigate(`/board/view/${boardId}`);
  };

  return (
    <div className="board">
      <h1 className="board_title">Board</h1>
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
            <div
              key={index}
              className="boardList"
              onClick={() => handleBoardView(data.BOARD_ID)}
            >
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
