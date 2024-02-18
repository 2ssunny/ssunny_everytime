import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function App() {
  const { boardId } = useParams();
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const fetchBoard = async () => {
      const response = await axios.get(
        `http://localhost:8000/board/${boardId}`
      );
      setBoard(response.data);
    };

    fetchBoard();
  }, [boardId]);

  if (!board) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{board.BOARD_TITLE}</h1>
      <p>{board.BOARD_CONTENT}</p>
      <p>
        Written at {board.REGISTER_DATE} by {board.REGISTER_ID}
      </p>
      <div>
        <p>Download: </p>
        {JSON.parse(board.FILES).map((file, index) => (
          <div key={index}>
            <a href={`http://localhost:8000/download/${file}`}>{file}</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
