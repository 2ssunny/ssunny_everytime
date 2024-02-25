import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./ScheduleCheck.css";

import { Navigation } from "../../navigation.js";

const nowScheduleUsername = localStorage.getItem("Username");
const nowScheduleUsernameSession = sessionStorage.getItem("Username");

function App() {
  const navigate = useNavigate();
  const scheduleUsername = nowScheduleUsername || nowScheduleUsernameSession;

  const { handleClickScheduleUpload } = Navigation();

  const [scheduleData, setScheduleData] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER}/scheduleList`, {
        params: {
          username: scheduleUsername,
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
  }, [scheduleUsername]);

  const handleClickScheduleView = (scheduleID, username) => {
    if (username === scheduleUsername) {
      navigate(`/schedule/view/${scheduleID}`);
    }
  };
  return (
    <div>
      {scheduleUsername ? (
        <div className="schedule_title">
          <h1>Welcome to your schedule page, {scheduleUsername}!</h1>
          <button
            className="scheduleupload"
            onClick={handleClickScheduleUpload}
          >
            upload schedule
          </button>
        </div>
      ) : (
        <h1 className="schedule_title">Login to use schedule feature</h1>
      )}

      {!scheduleData ? (
        <div>Loading...</div>
      ) : (
        <div className="ScheduleItem">
          {scheduleData.map((data, index) => {
            return (
              <div
                key={index}
                className="scheduleList"
                onClick={() =>
                  handleClickScheduleView(data.scheduleID, data.username)
                }
              >
                <div className="scheduleList_contents">
                  <p className="scheduleListTitle">{data.scheduleName}</p>
                  <p className="boardListStartDate">
                    Starts at {data.startDateTime}
                  </p>
                  <p className="boardListEndDate">
                    Until {data.finishDateTime}
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
