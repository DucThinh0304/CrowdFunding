import React from 'react'
import styled from 'styled-components';
import AllCampaingn from '../components/AllCampaingn';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const Container = styled.div`
  
`;

const TitleContainer = styled.div`
  background-color: #F0F0F0;
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
        <Navbar navbar={2}/>
        <TitleContainer>
            <Title>Toàn Bộ Các Dự Án</Title>
        </TitleContainer>
        <AllCampaingn/>
        <Footer/>
    </Container>
  )
}

export default AllCampaigns