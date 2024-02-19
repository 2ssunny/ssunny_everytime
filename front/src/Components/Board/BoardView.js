import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { Navigation } from "../../navigation.js";

import "./BoardView.css";

const nowBoardViewUsername = localStorage.getItem("Username");

function App() {
  const { boardId } = useParams();
  const [board, setBoard] = useState(null);

  const { handleClickBoard } = Navigation();

  const handleDeletePost = async () => {
    if (window.confirm("Do you want to delete this post?")) {
      const res = await axios.delete(
        `${process.env.REACT_APP_SERVER}/boardDelete/${boardId}`
      );
      if (res.status === 200) {
        alert("Post deleted");
        handleClickBoard();
      } else {
        alert("Failed to delete post");
      }
    }
  };

  useEffect(() => {
    const fetchBoard = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER}/board/${boardId}`
      );
      setBoard(response.data);
    };

    fetchBoard();
  }, [boardId]);

  if (!board) {
    return <div>Loading...</div>;
  }

  return (
    <div className="boardview">
      <h1 className="boardview_title">{board.BOARD_TITLE}</h1>
      <p className="boardview_content">{board.BOARD_CONTENT}</p>

      {board.FILES && JSON.parse(board.FILES).length > 0 && (
        <div className="boardview_fileDownload">
          <p>Download: </p>
          {JSON.parse(board.FILES).map((file, index) => (
            <div key={index}>
              <a href={`${process.env.REACT_APP_SERVER}/download/${file}`}>
                {file}
              </a>{" "}
            </div>
          ))}
        </div>
      )}
      <p>
        Written at {board.REGISTER_DATE} by {board.REGISTER_ID}
      </p>
      {nowBoardViewUsername === board.REGISTER_ID ? (
        <button onClick={() => handleDeletePost(boardId)}>Delete</button>
      ) : null}
      <button onClick={handleClickBoard}>Back</button>
    </div>
  );
}

export default App;
