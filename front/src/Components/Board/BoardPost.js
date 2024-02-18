import React, { useState, useEffect } from "react";

import axios from "axios";

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

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("username", nowBoardPostUsername);
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    const response = await axios.post(
      "http://localhost:8000/boardUpload",
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
    <div>
      <h1>BoardPost</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Body:
          <textarea value={body} onChange={(e) => setBody(e.target.value)} />
        </label>
        <label>
          Files:
          <input type="file" multiple onChange={handleFileChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
