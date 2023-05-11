import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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

const Register = () => {
  return (
    <Container>
      <Navbar />
      <TitleContainer>
        <Title>Đăng Kí</Title>
      </TitleContainer>
      <Wrapper>
        <Form>
          <Input placeholder="Tên tài khoản" />
          <Input placeholder="Email" />
          <Input placeholder="Mật khẩu" type={"password"} />
          <Input placeholder="Nhập lại mật khẩu" type={"password"} />
          <Button>ĐĂNG KÍ</Button>
        </Form>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Register;
