import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../redux/apiCalls";
import "../CSS/LoginPage.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { CircularProgress } from "@mui/material";

const Container = styled.div``;

const Title = styled.h1`
  font-size: 48px;
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
  margin-bottom: 10px;
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

const ButtonContainer = styled.div`
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  display: flex;
`;

const Button = styled.button`
  width: 100%;
  font-weight: 700;
  text-transform: uppercase;
  color: #0275d8;
  background-color: transparent;
  padding: 18px 30px;
  border: 1px solid #c9366f;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #c9366f;
    color: white;
  }
  transition: all 0.5s ease;
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

const TitleContainer = styled.div`
  background-color: #f0f0f0;
  height: 268px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LinkText = styled.div`
  text-decoration: underline;
  font-size: 18px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  display: flex;
  margin-top: 10px;
`;
const Error = styled.span`
  color: red;
`;

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isFetching, error, errorDes } = useSelector((state) => state.user);
  const [username, setUsername] = useState("");
  const [buttonTitle, setButtonTitle] = useState("ĐĂNG KÝ");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [email, setEmail] = useState("");
  const [errUsername, setErrUsername] = useState(false);
  const [errPassword, setErrPassword] = useState(false);
  const [errRepassword, setErrRepassword] = useState(false);
  const [errEmail, setErrEmail] = useState(false);
  const [errEmailValid, setErrEmailValid] = useState(false);
  const [errEqual, setErrEqual] = useState(false);
  const [typePassword, setTypePassword] = useState("password");
  const [typeRepassword, setTypeRepassword] = useState("password");
  const [isSave, setIsSave] = useState("notsave");

  const validateEmail = () => {
    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (email && email.match(isValidEmail)) return true;
    return false;
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
    if (email === "") {
      setErrEmail(true);
      flag = true;
    }
    if (repassword === "") {
      setErrRepassword(true);
      flag = true;
    }
    if (repassword !== password) {
      setErrEqual(true);
      flag = true;
    }
    if (validateEmail() === false) {
      console.log(validateEmail());
      setErrEmailValid(true);
      flag = true;
    }
    return flag;
  };
  const handleClick = (e) => {
    e.preventDefault();
    const checkInputResult = CheckInput();
    if (checkInputResult === false) {
      register(dispatch, { username, password, email }).then(setIsSave("done"));
    }
  };

  const changeTypePassword = () => {
    if (typePassword === "password") setTypePassword("text");
    else setTypePassword("password");
  };
  const changeTypeRePassword = () => {
    if (typeRepassword === "password") setTypeRepassword("text");
    else setTypeRepassword("password");
  };
  useEffect(() => {
    if (isSave === "done" && !isFetching && !CheckInput() && !error) {
      setButtonTitle("THÀNH CÔNG");
      const myTimeout = setTimeout(toLogin, 2000);
    }
  }, [isSave, isFetching]);
  const toLogin = () => {
    navigate("/login");
  };
  return (
    <Container>
      <Navbar />
      <TitleContainer>
        <Title>Đăng Kí</Title>
      </TitleContainer>
      <Wrapper>
        <Form>
          <Input
            placeholder="Tên tài khoản"
            onChange={(e) => {
              setUsername(e.target.value);
              setErrUsername(false);
            }}
          />
          {errUsername && <Error>Bạn cần nhập tài khoản</Error>}
          <Input
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
              setErrEmail(false);
              setErrEmailValid(false);
            }}
          />
          {errEmail && <Error>Bạn cần nhập Email</Error>}
          {errEmailValid && !errEmail && (
            <Error>Email của bạn không hợp lệ</Error>
          )}
          <PasswordContainer>
            <Password
              placeholder="Mật khẩu"
              type={typePassword}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrPassword(false);
              }}
            />
            {typePassword === "password" ? (
              <VisibilityIcon
                className="visibility"
                onClick={() => changeTypePassword()}
              />
            ) : (
              <VisibilityOffIcon
                className="visibility"
                onClick={() => changeTypePassword()}
              />
            )}
          </PasswordContainer>
          {errPassword && <Error>Bạn cần nhập mật khẩu</Error>}
          <PasswordContainer>
            <Password
              placeholder="Nhập lại mật khẩu"
              type={typeRepassword}
              onChange={(e) => {
                setRepassword(e.target.value);
                setErrRepassword(false);
                setErrEqual(false);
              }}
            />
            {typeRepassword === "password" ? (
              <VisibilityIcon
                className="visibility"
                onClick={() => changeTypeRePassword()}
              />
            ) : (
              <VisibilityOffIcon
                className="visibility"
                onClick={() => changeTypeRePassword()}
              />
            )}
          </PasswordContainer>
          {errRepassword && <Error>Bạn cần nhập lại mật khẩu</Error>}
          {errEqual && !errRepassword && (
            <Error>Nhập lại mật khẩu cần giống mật khẩu</Error>
          )}
          <ButtonContainer>
            {isFetching ? (
              <LoadingContainer>
                <CircularProgress
                  style={{ marginTop: "6px", marginBottom: "6px" }}
                ></CircularProgress>
              </LoadingContainer>
            ) : (
              <Button onClick={handleClick}>{buttonTitle}</Button>
            )}
          </ButtonContainer>

          {error && <Error>{errorDes}</Error>}
          <Link to="../login" style={{ color: "black" }}>
            <LinkText>Đã có tài khoản</LinkText>
          </Link>
        </Form>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Register;
