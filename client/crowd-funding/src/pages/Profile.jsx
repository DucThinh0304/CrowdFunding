import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Pending from "../components/setting/Pending";
import Deployment from "../components/setting/Deployment";
import { Link } from "react-router-dom";

const Container = styled.div``;

const Wrapper = styled.div``;

const Title = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px;
`;

const TableWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #eee;
  padding-top: 15px;
  padding-bottom: 15px;
`;

const Button = styled.button`
  margin: 50px;
  font-weight: 500;
  background-color: transparent;
  text-transform: uppercase;
  color: #0275d8;
  padding: 15px 8px;
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

const TableWrapper2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 15px;
  padding-bottom: 15px;
`;

const Profile = () => {
  return (
    <Container>
      <Navbar />
      <Wrapper>
        <TableWrapper>
          <Title>Dự án đang triển khai</Title>
          <Deployment />
        </TableWrapper>

        <TableWrapper2>
          <Title>Dự án đang chờ duyệt</Title>
          <Pending />
          <Link to="/create-campaign">
            <Button>Thêm dự án mới</Button>
          </Link>
        </TableWrapper2>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Profile;
