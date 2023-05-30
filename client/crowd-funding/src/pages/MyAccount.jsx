import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import Footer from "../components/Footer";
import { Link, useLocation } from "react-router-dom";
import Setting from "../components/Setting";

const Container = styled.div``;

const NotFound = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const TitleContainer = styled.div`
  background-color: #f0f0f0;
  height: 268px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 48px;
`;
const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  padding-left: 10vw;
  padding-right: 10vw;
  padding-top: 50px;
  padding-bottom: 50px;
`;
const Left = styled.div`
  flex: 1;
  flex-direction: column;
  align-items: flex-end;
`;
const MenuLink = styled.div`
  font-size: 16px;
  color: ${(props) => (props.id === "true" ? "white" : "black")};
  background-color: ${(props) =>
    props.id === "true" ? "#c9366f" : "transparent"};
  &:hover {
    background-color: #c9366f;
    color: white;
  }

  padding: 10px;
`;
const Right = styled.div`
  flex: 3;
  flex-direction: column;
`;

const MyAccount = () => {
  const location = useLocation();
  const [index, setIndex] = useState(1);
  const [exited, setExited] = useState(false);
  useEffect(() => {
    let page = location.pathname.split("/")[2];
    if (page === "support-campaign") {
      setExited(true);
      setIndex(1);
    } else if (page === "favorite") {
      setExited(true);
      setIndex(2);
    } else if (page === "setting") {
      setExited(true);
      setIndex(3);
    } else if (page === "address") {
      setExited(true);
      setIndex(4);
    } else {
      setExited(false);
    }
  }, [location]);
  return exited === true ? (
    <Container>
      <Navbar />
      <TitleContainer>
        <Title>Tài khoản</Title>
      </TitleContainer>
      <Wrapper>
        <Left>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/my-account/support-campaign"
          >
            <MenuLink id={index === 1 ? "true" : "false"}>Đã ủng hộ</MenuLink>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/my-account/favorite"
          >
            <MenuLink id={index === 2 ? "true" : "false"}>Yêu thích</MenuLink>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/my-account/setting"
          >
            <MenuLink id={index === 3 ? "true" : "false"}>Tài khoản</MenuLink>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/my-account/address"
          >
            <MenuLink id={index === 4 ? "true" : "false"}>Địa chỉ</MenuLink>
          </Link>
        </Left>
        <Right>
          <Setting />
        </Right>
      </Wrapper>
      <Footer />
    </Container>
  ) : (
    <NotFound>
      <div>Trang này không tồn tại </div>
      <Link to="/">Quay về trang chủ</Link>
    </NotFound>
  );
};

export default MyAccount;
