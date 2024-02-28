import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import "./BoardEdit.css";

const nowBoardEditUsername = localStorage.getItem("Username");
const nowBoardEditUsernameSession = sessionStorage.getItem("Username");

function App() {
  const username = nowBoardEditUsername || nowBoardEditUsernameSession;

  const { boardId } = useParams();

  const [titleEdit, setTitleEdit] = useState("");
  const [bodyEdit, setBodyEdit] = useState("");
  const [filesEdit, setFilesEdit] = useState([]);
  useEffect(() => {
    const fetchBoard = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER}/board/${boardId}`
      );
      setTitleEdit(response.data.BOARD_TITLE);
      setBodyEdit(response.data.BOARD_CONTENT);
    };

    fetchBoard();
  }, [boardId]);
  const handleFileChangeEdit = (e) => {
    if (e.target.files.length > 5) {
      alert("You can only upload up to 5 files.");
    } else {
      setFilesEdit(e.target.files);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!username) {
      alert("Login to post");
      return;
    }

    if (!titleEdit.trim() || !bodyEdit.trim()) {
      alert("Title and Content cannot be empty.");
      return;
    }

    const formData = new FormData();
    formData.append("title", titleEdit);
    formData.append("body", bodyEdit);
    for (let i = 0; i < filesEdit.length; i++) {
      formData.append("files", filesEdit[i]);
    }

    const response = await axios.post(
      `${process.env.REACT_APP_SERVER}/boardEdit/${boardId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.data.message === "success") {
      alert("Updating success. Going to the board page.");
      window.location.href = "/board";
    } else {
      console.log("Upload failed");
    }
  };

  return (
    <div className="boardedit">
      <form onSubmit={handleEditSubmit} className="boardpost_form">
        <div className="boardpost_form_box">
          <label className="boardpost_form_title">
            Title:
            <input
              type="text"
              value={titleEdit}
              onChange={(e) => setTitleEdit(e.target.value)}
            />
          </label>
          <label className="boardpost_form_body">
            Content:
            <textarea
              className="boardpost_form_body_input"
              value={bodyEdit}
              onChange={(e) => setBodyEdit(e.target.value)}
            />
          </label>
          <label className="boardpost_form_file">
            Files:
            <input type="file" multiple onChange={handleFileChangeEdit} />
          </label>
          <p>Files uploading now will replace files existed before.</p>
          <p>If the file name includes Korean, the Korean will look weird.</p>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;
