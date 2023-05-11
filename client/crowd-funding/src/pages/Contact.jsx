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

const TitleContainer = styled.div`
  background-color: #f0f0f0;
  height: 268px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Contact = () => {
  return (
    <Container>
      <Navbar />
      <TitleContainer>
        <Title>Liên hệ</Title>
      </TitleContainer>
      <Wrapper>aaaa</Wrapper>
      <Footer />
    </Container>
  );
};

export default Contact;
