import React, { useState } from "react";
import styled from "styled-components";
import AllCampaign from "../components/AllCampaign";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";

const Container = styled.div``;

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

const AllCampaigns = () => {
  const location = useLocation();
  const page = location.pathname.split("/")[2];
  const extraURL = page ? decodeURI(page) : "";
  return (
    <Container>
      <Navbar />
      <TitleContainer>
        <Title>
          {extraURL === "" ? "Toàn Bộ Các Dự Án" : `Tag: ${extraURL}`}
        </Title>
      </TitleContainer>
      <AllCampaign />
      <Footer />
    </Container>
  );
};

export default AllCampaigns;
