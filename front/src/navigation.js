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

  const handleClickBoard = (e) => {
    navigate("/board");
  };

  const handleClickBoardPost = (e) => {
    navigate("/board/post");
  };

  const handleClickScheduleCheck = (e) => {
    navigate("/schedule");
  };

  const handleClickScheduleUpload = (e) => {
    navigate("/schedule/upload");
  };
  return {
    handleClickHome,
    handleClickAbout,
    handleClickLogin,
    handleClickRegister,
    handleClickBoard,
    handleClickBoardPost,
    handleClickScheduleCheck,
    handleClickScheduleUpload,
  };
}
