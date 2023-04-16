import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { InsertEmoticon, FavoriteBorder, StarBorder } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core";
import { useLocation } from "react-router-dom";

const Container = styled.div``;

const Center = styled.div`
  display: flex;
  background-color: #eee;
  align-items: center;
  justify-content: center;
  padding-top: 50px;
  padding-bottom: 80px;
`;

const CampaignInfoContainer = styled.div`
  display: flex;
`;

const CampaignImage = styled.img`
  height: 371px;
  flex: 1;
  margin-right: 50px;
  width: 100%;
  display: block;
  object-fit: cover;
`;

const CampaignInfo = styled.div`
  flex: 1;
  margin-left: 50px;
  width: 0%;
`;

const CampaignTagContainer = styled.div``;

const CampaignTag = styled.span`
  cursor: pointer;
  color: #c9366f;
  font-size: 14px;
`;

const CampaignTitle = styled.h3`
  font-size: 36px;
  margin-top: 20px;
  margin-bottom: 20px;
  font-weight: 500;
`;

const CampaignNumberContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  font-weight: 600;
  padding: 5px 0px 22px;
`;

const CampaignNumber = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CampaignProgessContainer = styled.div`
  display: flex;
  font-weight: 600;
  flex-direction: column;
`;

const ProgressBar = styled.div`
  width: 100%;
  background-color: #e1e1e1;
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

const CampaignProgressNumberContainer = styled.div`
  display: flex;
  font-size: 14px;
  align-items: center;
  justify-content: space-between;
`;

const CampaignProgressNumber = styled.span``;

const useStyles = makeStyles({
  icon: {
    color: "#c9366f",
    transform: "scale(0.8)",
  },
});

const formatter = new Intl.NumberFormat(
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })
);

const Campaign = () => {
  const classes = useStyles();
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  return (
    <Container>
      <Navbar />
      <Center>
        <CampaignInfoContainer>
          <CampaignImage src="https://crowdfunding.comicola.com/wp-content/uploads/2017/10/22688446_514860328866877_2961839570336965602_n.jpg" />
          <CampaignInfo>
            <CampaignTagContainer>
              <CampaignTag>Nổi bật </CampaignTag>
              <CampaignTag>Sách</CampaignTag>
            </CampaignTagContainer>
            <CampaignTitle>
              Gây quỹ để xuất bản Cuốn sách “Họa Sắc Việt”
            </CampaignTitle>
            <CampaignNumberContainer>
              <CampaignNumber>
                <InsertEmoticon className={classes.icon} />
                230 Người ủng hộ
              </CampaignNumber>
              <CampaignNumber>
                <FavoriteBorder className={classes.icon} />
                22
              </CampaignNumber>
              <CampaignNumber>
                <StarBorder className={classes.icon} />1 Nhận xét
              </CampaignNumber>
            </CampaignNumberContainer>
            <CampaignProgessContainer>
              <CampaignProgressNumberContainer>
                <CampaignProgressNumber>
                  209,200,000 ₫ Đã ủng hộ
                </CampaignProgressNumber>
                <CampaignProgressNumber>
                  200,000,000 ₫ Mục tiêu
                </CampaignProgressNumber>
              </CampaignProgressNumberContainer>
              <ProgressBar percentage={50} />
              <CampaignProgressNumberContainer>
                <CampaignProgressNumber>0 ngày còn lại</CampaignProgressNumber>
                <CampaignProgressNumber>106% Thành công</CampaignProgressNumber>
              </CampaignProgressNumberContainer>
            </CampaignProgessContainer>
          </CampaignInfo>
        </CampaignInfoContainer>
      </Center>
      <Footer />
    </Container>
  );
};

export default Campaign;
