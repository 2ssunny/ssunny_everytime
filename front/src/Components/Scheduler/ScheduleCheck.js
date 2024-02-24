import React, { useEffect, useState } from "react";
import axios from "axios";

import "./ScheduleCheck.css";

import { Navigation } from "../../navigation.js";

const nowScheduleUsername = localStorage.getItem("Username");
const nowScheduleUsernameSession = sessionStorage.getItem("Username");

function App() {
  const username = nowScheduleUsername || nowScheduleUsernameSession;

  const { handleClickScheduleUpload } = Navigation();

  const [scheduleData, setScheduleData] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER}/scheduleList`, {
        params: {
          username: username,
        },
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setScheduleData(res.data);
        } else {
          console.error("Unexpected response data:", res.data);
          setScheduleData([]);
        }
      });
  }, [username]);

  return (
    <div>
      {username ? (
        <div className="schedule_title">
          <h1>Welcome to your schedule page, {username}!</h1>
          <button
            className="scheduleupload"
            onClick={handleClickScheduleUpload}
          >
            upload schedule
          </button>
        </div>
      ) : (
        <p>Login to upload schedule</p>
      )}

      {!scheduleData ? (
        <div>Loading...</div>
      ) : (
        <div className="ScheduleItem">
          {scheduleData.map((data, index) => {
            return (
              <div key={index} className="scheduleList">
                <div className="scheduleList_contents">
                  <p className="scheduleListTitle">{data.scheduleName}</p>
                  <p className="boardListStartDate">
                    Starts at {data.startDateTime}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
