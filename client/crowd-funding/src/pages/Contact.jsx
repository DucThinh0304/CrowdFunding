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

const ContactContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-left: 50px;
`;

const Image = styled.img`
  object-fit: cover;
  height: 100px;
  width: 100px;
  margin: 10px;
`;

const LocationText = styled.div`
  font-size: 32px;
  margin: 10px;
`;

const ContactText = styled.div`
  font-size: 24px;
  margin: 10px;
`;
const FormContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
  align-items: left;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  margin-right: 4%;
  width: 36%;
  border: 0.1px solid lightgray;
`;

const InputSubject = styled.input`
  padding: 10px;
  font-size: 16px;
  margin-right: 5%;
  width: 80%;
  border: 0.1px solid lightgray;
`;
const InputContainer = styled.div`
  margin: 20px;
  display: flex;
`;

const TextArea = styled.textarea`
  padding: 10px;
  font-size: 16px;
  width: 80%;
  height: 100px;
  border: 0.1px solid lightgray;
  margin-right: 5%;
`;

const Button = styled.button`
  background-color: #c9366f;
  color: white;
  border-radius: 15px;
  width: fit-content;
  height: fit-content;
  font-size: 20px;
  margin: 20px;
  padding: 15px 30px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #941d4b;
    color: white;
  }
`;

const Contact = () => {
  return (
    <Container>
      <Navbar />
      <TitleContainer>
        <Title>Liên hệ</Title>
      </TitleContainer>
      <Wrapper>
        <ContactContainer>
          <Image src="https://demo.themeum.com/wordpress/patrios/wp-content/uploads/2018/10/gps-icon.png" />
          <LocationText>KTX khu A, đường Tạ Quang Bửu</LocationText>
          <ContactText>duthinhvippro@gmail.com</ContactText>
          <ContactText>0392 381 741</ContactText>
        </ContactContainer>
        <FormContainer>
          <InputContainer>
            <Input type="text" placeholder="Tên" />
            <Input type="text" placeholder="Email" />
          </InputContainer>
          <InputContainer>
            <InputSubject type="text" placeholder="Chủ đề" />
          </InputContainer>
          <InputContainer>
            <TextArea placeholder="Nội dung"></TextArea>
          </InputContainer>
          <Button>Gửi</Button>
        </FormContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Contact;
