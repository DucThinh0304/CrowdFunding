import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { login } from "../../redux/apiCalls";
import "./login.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errUsername, setErrUsername] = useState(false);
  const [errPassword, setErrPassword] = useState(false);
  const [type, setType] = useState("password");
  const dispatch = useDispatch();
  const { isFetching, error, errorDes } = useSelector((state) => state.user);

  const handleLogin = (e) => {
    e.preventDefault();
    const checkInputResult = CheckInput();
    if (checkInputResult === false) {
      login(dispatch, { username, password });
    }
  };
  const CheckInput = () => {
    let flag = false;
    if (username === "") {
      setErrUsername(true);
      flag = true;
    }
    if (password === "") {
      setErrPassword(true);
      flag = true;
    }
    return flag;
  };
  const changeType = () => {
    if (type === "password") setType("text");
    else setType("password");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin(event);
    }
  };
  return (
    <div className="containerLogin">
      <div className="titleContainer">
        <h1 className="title">Đăng nhập</h1>
      </div>
      <div className="wrapper">
        <div className="form">
          <input
            className="input"
            type="text"
            placeholder="Tên đăng nhập"
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {errUsername && <div className="error">Bạn cần nhập tài khoản</div>}
          <div className="passwordContainer">
            <input
              type={type}
              className="password"
              placeholder="Mật khẩu"
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {type === "password" ? (
              <VisibilityIcon
                className="visibility"
                onClick={() => changeType()}
              />
            ) : (
              <VisibilityOffIcon
                className="visibility"
                onClick={() => changeType()}
              />
            )}
          </div>
          {errPassword && <div className="error">Bạn cần nhập mật khẩu</div>}
          <div className="buttonContainer">
            <button className="button" onClick={(e) => handleLogin(e)}>
              Đăng nhập
            </button>
          </div>
          {error && <div className="error">{errorDes}</div>}
        </div>
      </div>
    </div>
  );
};

export default Login;
