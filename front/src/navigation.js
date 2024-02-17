import { useNavigate } from "react-router-dom";

export function Navigation() {
  const navigate = useNavigate();

  const handleClickHome = (e) => {
    navigate("/");
  };

  const handleClickAbout = (e) => {
    navigate("/about");
  };

  const handleClickLogin = (e) => {
    navigate("/login");
  };

  const handleClickRegister = (e) => {
    navigate("/login/register");
  };

  const handleClickTimetableCheck = (e) => {
    navigate("/timetable");
  };

  const handleClickTimetableSet = (e) => {
    navigate("/timetable/set");
  };

  const handleClickBoard = (e) => {
    navigate("/board");
  };

  const handleClickBoardPost = (e) => {
    navigate("/board/post");
  };

  return {
    handleClickHome,
    handleClickAbout,
    handleClickLogin,
    handleClickRegister,
    handleClickTimetableCheck,
    handleClickTimetableSet,
    handleClickBoard,
    handleClickBoardPost,
  };
}
