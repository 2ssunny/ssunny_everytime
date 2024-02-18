import React, { useState } from "react";

import axios from "axios";

import "./BoardPost.css";

const nowBoardPostUsername = localStorage.getItem("Username");

function App() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    if (e.target.files.length > 5) {
      alert("You can only upload up to 5 files.");
    } else {
      setFiles(e.target.files);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nowBoardPostUsername) {
      alert("Login to post");
      return;
    }

    if (!title.trim() || !body.trim()) {
      alert("Title and Content cannot be empty.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("username", nowBoardPostUsername);
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    const response = await axios.post(
      `${process.env.REACT_APP_SERVER}/boardUpload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.data.message === "success") {
      alert("Upload success. Going to the board page.");
      window.location.href = "/board";
    } else {
      console.log("Upload failed");
    }
  };

  return (
    <div className="boardpost">
      <h1 className="boardpost_title">BoardPost</h1>
      <form onSubmit={handleSubmit} className="boardpost_form">
        <div className="boardpost_form_box">
          <label className="boardpost_form_title">
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label className="boardpost_form_body">
            Content:
            <textarea
              className="boardpost_form_body_input"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </label>
          <label className="boardpost_form_file">
            Files:
            <input type="file" multiple onChange={handleFileChange} />
          </label>

          <p className="boardpost_username">
            Positng as {nowBoardPostUsername}
          </p>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;
