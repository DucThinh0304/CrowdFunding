import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { InsertEmoticon, FavoriteBorder, StarBorder } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core";

const Container = styled.div``;

const Center = styled.div``;

const CampaignInfoContainer = styled.div``;

const CampaignImage = styled.img``;

const CampaignInfo = styled.div``;

const CampaignTagContainer = styled.div``;

const CampaignTag = styled.div``;

const CampaignTitle = styled.h3``;

const CampaignNumberContainer = styled.div``;

const CampaignNumber = styled.div``;

const ProgressBar = styled.div`
  width: 100%;
  background-color: #eee;
  border-radius: 20px;
  height: 6px;
  position: relative;
  margin: 10px 0px;

  &:before {
    content: attr(data-percentage);
    width: ${(props) => props.percentage || 0}%;
    left: 0;
    top: 0;
    bottom: 0;
    border-radius: 20px;
    background-color: #c9366f;
    display: flex;
    align-items: center;
    position: absolute;
    max-width: 100%;
    transition: all 1s ease;
  }
`;

const useStyles = makeStyles({
  icon: {
    color: "#0275d8",
    cursor: "pointer",
    transition: "all 0.3s ease",
    "&:hover": {
      color: "#3c52b2",
    },
  },
});

const formatter = new Intl.NumberFormat(
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })
);

const Campaign = () => {
  return (
    <Container>
      <Navbar />
      <Center>
        <CampaignInfoContainer>
          <CampaignImage src="https://crowdfunding.comicola.com/wp-content/uploads/2017/10/22688446_514860328866877_2961839570336965602_n.jpg" />
          <CampaignInfo>
            <CampaignTagContainer>
              <CampaignTag>Nổi bật</CampaignTag>
              <CampaignTag>Sách</CampaignTag>
            </CampaignTagContainer>
            <CampaignTitle>
              Gây quỹ để xuất bản Cuốn sách “Họa Sắc Việt”
            </CampaignTitle>
            <CampaignNumberContainer>
              <CampaignNumber>
                <InsertEmoticon />
                230 Người ủng hộ
              </CampaignNumber>
              <CampaignNumber>
                <FavoriteBorder />
                22
              </CampaignNumber>
              <CampaignNumber>
                <StarBorder />1 Nhận xét
              </CampaignNumber>
            </CampaignNumberContainer>
          </CampaignInfo>
        </CampaignInfoContainer>
      </Center>
      <Footer />
    </Container>
  );
};

export default Campaign;
