import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../redux/apiCalls";
import "../CSS/LoginPage.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

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
  width: 40%;
  font-weight: 700;
  margin-top: 20px;
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

const TitleContainer = styled.div`
  background-color: #f0f0f0;
  height: 268px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LinkText = styled.div`
  text-decoration: underline;
  margin-top: 15px;
  font-size: 18px;
  cursor: pointer;
`;
const Error = styled.span`
  color: red;
`;

const Register = () => {
  const handleClick = (e) => {
    if (password === repassword) {
      e.preventDefault();
      register(dispatch, { username, password, email });
    } else {
      console.log("Sai mật khẩu");
    }
  };
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [email, setEmail] = useState("");
  const [typePassword, setTypePassword] = useState("password");
  const [typeRepassword, setTypeRepassword] = useState("password");

  const changeTypePassword = () => {
    if (typePassword === "password") setTypePassword("text");
    else setTypePassword("password");
  };
  const changeTypeRePassword = () => {
    if (typeRepassword === "password") setTypeRepassword("text");
    else setTypeRepassword("password");
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
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordContainer>
            <Password
              placeholder="Mật khẩu"
              type={typePassword}
              onChange={(e) => setPassword(e.target.value)}
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
          <PasswordContainer>
            <Password
              placeholder="Nhập lại mật khẩu"
              type={typeRepassword}
              onChange={(e) => setRepassword(e.target.value)}
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
          <Link to="/login">
            <Button onClick={handleClick} disabled={isFetching}>
              ĐĂNG KÍ
            </Button>
          </Link>
          {error && <Error>Có lỗi đã xảy ra...</Error>}
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
