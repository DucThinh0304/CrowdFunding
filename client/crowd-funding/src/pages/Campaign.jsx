import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Link, useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethod";
import { CircularProgress } from "@mui/material";

const Container = styled.div``;

const LoadingContainer = styled.div`
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

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
  &:hover {
    color: #40bda5;
  }
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

const Button = styled.button`
  width: 40%;
  font-weight: 700;
  margin-top: 20px;
  background-color: transparent;
  text-transform: uppercase;
  color: #0275d8;
  padding: 18px 30px;
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

const CampaignProgressNumber = styled.span``;

// const useStyles = makeStyles({
//   icon: {
//     color: "#c9366f",
//     transform: "scale(0.8)",
//   },
// });

const formatter = new Intl.NumberFormat(
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })
);
const checkDay = (check) => {
  return check < 0 ? false : true;
};

const Campaign = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const today = new Date();
  const oneDay = 24 * 60 * 60 * 1000;
  const [campaign, setCampaign] = useState({});
  const [loading, setLoading] = useState(true);

  const date = new Date(campaign.dayfinish);

  useEffect(() => {
    const getCampaign = async () => {
      publicRequest
        .get("/campaign/find/" + id)
        .then((res) => {
          setCampaign(res.data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    };
    getCampaign();
  }, [id]);

  return loading === true ? (
    <Container>
      <Navbar />
      <Center>
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
      </Center>
      <Footer />
    </Container>
  ) : (
    <Container>
      <Navbar />
      <Center>
        <CampaignInfoContainer>
          <CampaignImage src={campaign.img} />
          <CampaignInfo>
            <CampaignTagContainer>
              {campaign.tag?.map((tag) => (
                <CampaignTag key={tag}>{tag} </CampaignTag>
              ))}
            </CampaignTagContainer>
            <CampaignTitle>{campaign.title}</CampaignTitle>
            <CampaignNumberContainer>
              <CampaignNumber>
                <InsertEmoticonIcon />
                {campaign.supporters} Người ủng hộ
              </CampaignNumber>
              <CampaignNumber>
                <FavoriteBorderIcon />
                {campaign.likes}
              </CampaignNumber>
              <CampaignNumber>
                <StarBorderIcon />
                {campaign.comments}
              </CampaignNumber>
            </CampaignNumberContainer>
            <CampaignProgessContainer>
              <CampaignProgressNumberContainer>
                <CampaignProgressNumber>
                  {formatter.format(campaign.donatesum)} ₫ Đã ủng hộ
                </CampaignProgressNumber>
                <CampaignProgressNumber>
                  {formatter.format(campaign.donateneed)} ₫ Mục tiêu
                </CampaignProgressNumber>
              </CampaignProgressNumberContainer>
              <ProgressBar
                percentage={(campaign.donatesum / campaign.donateneed) * 100}
              />
              <CampaignProgressNumberContainer>
                <CampaignProgressNumber>
                  {checkDay(Math.round((date - today) / oneDay)) === true
                    ? Math.round(Math.abs((date - today) / oneDay))
                    : "0"}{" "}
                  ngày còn lại
                </CampaignProgressNumber>
                <CampaignProgressNumber>
                  {Math.round((campaign.donatesum / campaign.donateneed) * 100)}
                  % Thành công
                </CampaignProgressNumber>
              </CampaignProgressNumberContainer>
            </CampaignProgessContainer>
          </CampaignInfo>
        </CampaignInfoContainer>
      </Center>
      <Link to={`/donate/${campaign._id}`}>
        <Button>Donate</Button>
      </Link>
      <Footer />
    </Container>
  );
};

export default Campaign;
