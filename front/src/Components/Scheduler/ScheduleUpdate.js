import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { Navigation } from "../../navigation.js";

import "./ScheduleView.css";

const nowScheduleViewUsername = localStorage.getItem("Username");
const nowScheduleViewUsernameSession = sessionStorage.getItem("Username");

function App() {
  const scheduleUsername =
    nowScheduleViewUsername || nowScheduleViewUsernameSession;
  const { scheduleId } = useParams();
  const nowDatetime = new Date();

  const [scheduleBefore, setScheduleBefore] = useState(null);
  const [scheduleName, setScheduleName] = useState("");
  const [scheduleContent, setScheduleContent] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");

  const { handleClickScheduleCheck } = Navigation();
  const handleUpdateSchedule = async (event) => {
    event.preventDefault();

    const res = await axios.post(
      `${process.env.REACT_APP_SERVER}/scheduleEdit/${scheduleId}`,
      {
        scheduleName,
        scheduleContent,
        startDateTime,
        endDateTime,
      }
    );
    if (res.status === 200) {
      alert("Schedule updated");
      handleClickScheduleCheck();
    } else {
      alert("Failed to update schedule");
    }
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER}/schedule/${scheduleId}`, {
        params: {
          id: scheduleId,
        },
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setScheduleBefore(res.data);
          setScheduleName(res.data[0].scheduleName);
          setScheduleContent(res.data[0].scheduleContent);
          setStartDateTime(res.data[0].startDateTime);
          setEndDateTime(res.data[0].finishDateTime);
        } else {
          console.error("Unexpected response data:", res.data);
          setScheduleBefore([]);
        }
      });
  }, [scheduleId]);

  if (!scheduleBefore || scheduleBefore.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="scheduleUpload">
      <h1 className="scheduleUpload">Editing {scheduleUsername}'s Schedule</h1>
      <form className="scheduleUpload_form">
        <div className="scheduleUpload_form_box">
          <label className="scheduleUpload_form_title">
            Schedule Title:
            <input
              type="text"
              value={scheduleName}
              onChange={(e) => setScheduleName(e.target.value)}
            />
          </label>
          <label className="scheduleUpload_form_body">
            Detail of Schedule:
            <textarea
              className="scheduleUpload_form_body_input"
              value={scheduleContent}
              onChange={(e) => setScheduleContent(e.target.value)}
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
          <button type="submit" onClick={handleUpdateSchedule}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
