import React from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { logoutUser } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

const Inaccessible = () => {
  const dispatch = useDispatch();
  const handleSignOut = (e) => {
    logoutUser(dispatch);
  };
  return (
    <div className="containerLogin">
      <div>Bạn không có quyền truy cập vào trang này</div>
      <Link to="/login" onClick={(e) => handleSignOut(e)}>
        Trở về đăng nhập
      </Link>
    </div>
  );
};

export default Inaccessible;
