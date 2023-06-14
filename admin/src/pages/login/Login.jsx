import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { login } from "../../redux/apiCalls";
import "./login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };
  return (
    <div className="containerLogin">
      <input
        className="input"
        type="text"
        placeholder="Tên đăng nhập"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        className="input"
        placeholder="Mật khẩu"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="button" onClick={(e) => handleLogin(e)}>
        Đăng nhập
      </button>
    </div>
  );
};

export default Login;
