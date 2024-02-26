import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Navigation } from "../../navigation.js";

import "./BoardView.css";

const nowBoardViewUsername = localStorage.getItem("Username");
const nowBoardViewUsernameSession = sessionStorage.getItem("Username");

function App() {
  const navigate = useNavigate();

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

  const handleBoardEdit = (boardId) => {
    if (username) {
      navigate(`/board/edit/${boardId}`);
    } else {
      alert("Login to view the post");
    }
  };

  if (!board) {
    return <div>Loading...</div>;
  }
  const username = nowBoardViewUsername || nowBoardViewUsernameSession;
  const files = JSON.parse(board.FILES);
  const imageIndexes = board.imageIndexes || [];
  const imageFiles = imageIndexes.map((index) => files[index]);
  return (
    <div className="boardview">
      <h1 className="boardview_title">{board.BOARD_TITLE}</h1>
      <p className="boardview_content">{board.BOARD_CONTENT}</p>

      {imageFiles.length > 0 && (
        <div className="boardview_images">
          {imageFiles.map((file, index) => (
            <img
              key={index}
              src={`${process.env.REACT_APP_SERVER}/download/${file}`}
              alt={file}
              className="boardview_image"
            />
          ))}
          <p className="boardview_space_nextimage"></p>
        </div>
      )}

      {board.FILES && files.length > 0 && (
        <div className="boardview_fileDownload">
          <p>Download: </p>
          {files.map((file, index) => (
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
      {board.REGISTER_DATE === board.UPDATE_DATE ? null : (
        <p>
          Updated at {board.UPDATE_DATE} by {board.REGISTER_ID}
        </p>
      )}
      {username === board.REGISTER_ID ? (
        <div>
          <button onClick={() => handleDeletePost(boardId)}>Delete</button>
          <button onClick={() => handleBoardEdit(boardId)}>Edit</button>
        </div>
      ) : null}
      <button onClick={handleClickBoard}>Back</button>
    </div>
  );
}

export default App;
