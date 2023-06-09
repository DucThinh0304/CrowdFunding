import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "../CSS/LoginPage.css";
import { CircularProgress } from "@mui/material";

const Container = styled.div``;

const Title = styled.h1`
  font-size: 48px;
`;

const ButtonContainer = styled.div`
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  display: flex;
`;

const LoadingContainer = styled.div`
  display: flex;
  width: 100%;
  background-color: transparent;
  border: 1px solid #c9366f;
  border-radius: 5px;
  transition: all 0.5s ease;
  cursor: not-allowed;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  padding: 70px;
  background-color: white;
  align-items: center;
  display: flex;
  justify-content: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  border: 0.1px solid lightgray;
  padding: 20px 80px;
  width: 35%;
  border-radius: 10px;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 15px;
  font-size: 18px;
`;
const PasswordContainer = styled.div`
  position: relative;
  margin-top: 10px;
  display: flex;
`;

const Password = styled.input`
  padding: 15px;
  flex: 1;
  min-width: 40%;
  font-size: 18px;
  display: inline-block;
  position: relative;
`;

const Button = styled.button`
  width: 100%;
  font-weight: 700;
  background-color: transparent;
  text-transform: uppercase;
  color: #0275d8;
  padding: 18px 30px;
  border: 1px solid #c9366f;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #c9366f;
    color: white;
  }
  transition: all 0.5s ease;
  &:disabled {
    color: gray;
    cursor: not-allowed;
  }
`;

const LinkText = styled.div`
  text-decoration: underline;
  margin-top: 15px;
  font-size: 18px;
  cursor: pointer;
`;

const TitleContainer = styled.div`
  background-color: #f0f0f0;
  height: 268px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Error = styled.span`
  color: red;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errUsername, setErrUsername] = useState(false);
  const [errPassword, setErrPassword] = useState(false);
  const [type, setType] = useState("password");
  const dispatch = useDispatch();
  const { isFetching, error, errorDes } = useSelector((state) => state.user);

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

  const handleClick = (e) => {
    e.preventDefault();
    const checkInputResult = CheckInput();
    if (checkInputResult === false) {
      login(dispatch, { username, password });
    }
  };
  const changeType = () => {
    if (type === "password") setType("text");
    else setType("password");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleClick(event);
    }
  };

  return (
    <Container>
      <Navbar />
      <TitleContainer>
        <Title>Đăng Nhập</Title>
      </TitleContainer>
      <Wrapper>
        <Form>
          <Input
            placeholder="Tên tài khoản"
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {errUsername && <Error>Bạn cần nhập tài khoản</Error>}
          <PasswordContainer>
            <Password
              placeholder="Mật khẩu"
              type={type}
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
          </PasswordContainer>
          {errPassword && <Error>Bạn cần nhập mật khẩu</Error>}
          <ButtonContainer>
            {isFetching ? (
              <LoadingContainer>
                <CircularProgress
                  style={{ marginTop: "6px", marginBottom: "6px" }}
                ></CircularProgress>
              </LoadingContainer>
            ) : (
              <Button onClick={handleClick}>ĐĂNG NHẬP</Button>
            )}
          </ButtonContainer>
          {error && <Error>{errorDes}</Error>}
          <Link style={{ color: "black" }}>
            <LinkText>Quên mật khẩu?</LinkText>
          </Link>
          <Link to="../register" style={{ color: "black" }}>
            <LinkText>Tạo tài khoản mới</LinkText>
          </Link>
        </Form>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Login;
