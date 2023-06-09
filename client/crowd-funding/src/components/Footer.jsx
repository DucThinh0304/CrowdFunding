import React from "react";
import styled from "styled-components";
import MainLogo from "../asset/Happy.png";

const Container = styled.div`
  background-color: #202020;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 50px 70px;
`;

const First = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Second = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Third = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Forth = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  color: white;
  font-size: 22px;
  padding: 20px 0px;
`;

const Link = styled.a`
  cursor: pointer;
  color: #939393;
  font-size: 16px;
  &:hover {
    color: #41bb98;
  }
  transition: all 0.7s ease;
  padding: 10px 0px;
`;
const ImageLogo = styled.img`
  width: 200px;
  margin: 15px 0px;
`;
const Logo = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const Footer = () => {
  return (
    <Container>
      <First>
        <Title>Thông tin thêm</Title>
        <Link>Báo chí nói về chúng tôi</Link>
        <Link>Các vấn đề pháp lý</Link>
        <Link>Hướng dẫn thanh toán</Link>
      </First>
      <Second>
        <Title>Điều khoản</Title>
        <Link>Điều khoản sử dụng</Link>
        <Link>Bảo vệ khách hàng</Link>
        <Link>Phí nền tảng và các loại phí khác</Link>
      </Second>
      <Third>
        <Title>Tài khoản</Title>
        <Link>Tài Khoản</Link>
        <Link>Thanh toán</Link>
        <Link>Giỏ hàng</Link>
      </Third>
      <Forth>
        <Logo>
          <ImageLogo src={MainLogo} />
        </Logo>
      </Forth>
    </Container>
  );
};

export default Footer;
