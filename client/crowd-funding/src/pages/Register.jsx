import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../redux/apiCalls";

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
          <Input
            placeholder="Mật khẩu"
            type={"password"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            placeholder="Nhập lại mật khẩu"
            type={"password"}
            onChange={(e) => setRepassword(e.target.value)}
          />
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
