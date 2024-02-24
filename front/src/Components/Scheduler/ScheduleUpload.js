import { useState } from "react";
import axios from "axios";
import "./ScheduleUpload.css";

const nowScheduleUploadUsername = localStorage.getItem("Username");
const nowScheduleUploadUsernameSession = sessionStorage.getItem("Username");

function App() {
  const scheduleUsername =
    nowScheduleUploadUsername || nowScheduleUploadUsernameSession;
  const nowDatetime = new Date();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");

  const handleClickScheduleUpload = async (e) => {
    e.preventDefault();
    if (!scheduleUsername) {
      alert("Login to post");
      return;
    }

    if (!title.trim() || !body.trim()) {
      alert("Title and Content of Schedule cannot be empty.");
      return;
    }

    if (startDateTime > endDateTime) {
      alert("Start datetime cannot be later than end datetime.");
      return;
    }

    if (startDateTime < nowDatetime) {
      alert("Start datetime cannot be earlier than now.");
      return;
    }

    if (!startDateTime) {
      alert("Start datetime cannot be empty.");
      return;
    }

    const response = await axios.post(
      `${process.env.REACT_APP_SERVER}/scheduleUpload`,
      {
        username: scheduleUsername,
        title: title,
        body: body,
        startDateTime: startDateTime,
        endDateTime: endDateTime,
      }
    );
    if (response.data.message === "success") {
      alert("Upload success. Going to the schedule check page.");
      window.location.href = "/schedule";
    } else {
      console.log("Upload failed");
    }
  };

  return (
    <div className="scheduleUpload">
      <h1 className="scheduleUpload">Upload {scheduleUsername}'s Schedule</h1>
      <form className="scheduleUpload_form">
        <div className="scheduleUpload_form_box">
          <label className="scheduleUpload_form_title">
            Schedule Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label className="scheduleUpload_form_body">
            Detail of Schedule:
            <textarea
              className="scheduleUpload_form_body_input"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </label>
          <p>Now datetime: {nowDatetime.toString()}</p>
          <p>Start datetime of this schedule</p>
          <input
            type="datetime-local"
            value={startDateTime}
            onChange={(e) => setStartDateTime(e.target.value)}
          />
          <p>End datetime of this schedule</p>
          <input
            type="datetime-local"
            value={endDateTime}
            onChange={(e) => setEndDateTime(e.target.value)}
          />
          <p></p>
          <button type="submit" onClick={handleClickScheduleUpload}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
