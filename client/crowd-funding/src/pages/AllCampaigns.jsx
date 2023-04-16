import React from "react";
import styled from "styled-components";
import AllCampaign from "../components/AllCampaign";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

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
  return (
    <Container>
      <Navbar />
      <TitleContainer>
        <Title>Toàn Bộ Các Dự Án</Title>
      </TitleContainer>
      <AllCampaign />
      <Footer />
    </Container>
  );
};

export default AllCampaigns;
