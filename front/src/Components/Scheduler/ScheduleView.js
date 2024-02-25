import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { Navigation } from "../../navigation.js";

import "./ScheduleView.css";

const nowScheduleViewUsername = localStorage.getItem("Username");
const nowScheduleViewUsernameSession = sessionStorage.getItem("Username");

function App() {
  const { scheduleId } = useParams();
  const [schedule, setSchedule] = useState(null);

  const { handleClickScheduleCheck } = Navigation();

  const handleDeleteSchedule = async () => {
    if (window.confirm("Do you want to delete this schedule?")) {
      const res = await axios.delete(
        `${process.env.REACT_APP_SERVER}/scheduleDelete/${scheduleId}`
      );
      if (res.status === 200) {
        alert("Schedule deleted");
        handleClickScheduleCheck();
      } else {
        alert("Failed to delete schedule");
      }
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
          setSchedule(res.data);
        } else {
          console.error("Unexpected response data:", res.data);
          setSchedule([]);
        }
      });
  }, [scheduleId]);

  if (!schedule || schedule.length === 0) {
    return <div>Loading...</div>;
  }
  const username = nowScheduleViewUsername || nowScheduleViewUsernameSession;

  console.log(schedule);

  const handleButtonClickSchedule = () => {
    handleClickScheduleCheck();
  };
  return (
    <div className="scheduleview">
      <h1 className="scheduleview_title">{schedule[0].scheduleName}</h1>
      <p className="scheduleview_content">{schedule[0].scheduleContent}</p>
      <p className="scheduleview_date">Stars at {schedule[0].startDateTime}</p>
      <p className="scheduleview_date">Ends at {schedule[0].finishDateTime}</p>
      <p className="scheduleview_register">
        Registered at {schedule[0].updateDate}
      </p>
      {username === schedule[0].username && (
        <button className="scheduleview_delete" onClick={handleDeleteSchedule}>
          Delete
        </button>
      )}
      <button onClick={handleButtonClickSchedule}>back</button>
    </div>
  );
}

export default App;
