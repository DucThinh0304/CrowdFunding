import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

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

const Login = () => {
  return (
    <Container>
      <Navbar />

      <TitleContainer>
        <Title>Đăng Nhập</Title>
      </TitleContainer>
      <Wrapper>
        <Form>
          <Input placeholder="Tên tài khoản" />
          <Input placeholder="Mật khẩu" type={"password"} />
          <Button>ĐĂNG NHẬP</Button>
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
