import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { publicRequest } from "../requestMethod";
import { useLocation } from "react-router-dom";
import { Avatar, Username } from "./Avatar";
import { Link } from "react-router-dom";
import { CircularProgress, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { favorite, removefavorite } from "../redux/apiCalls";
import "../CSS/Icon.css";

const Container = styled.div`
  display: flex;
  background-color: white;
  padding: 125px 0px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const CircularProgressContainer = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  height: 70vh;
  padding-top: 50px;
  padding-bottom: 50px;
`;

const CampaignsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1140px;
  flex-wrap: wrap;
  max-width: 100%;
  position: relative;
  margin: 0 auto;
  box-sizing: inherit;
`;

const CampaignContainer = styled.div`
  flex: 0 0 50%;
  max-width: 50%;
  position: relative;
  width: 100%;
  min-height: 1px;
  box-sizing: inherit;
  display: block;
`;

const Campaign = styled.div`
  border-radius: 5px;
  border: 0.1px solid lightgray;
  position: relative;
  overflow: hidden;
  box-sizing: inherit;
  height: fit-content;
  margin: 15px 15px;
  display: flex;
  flex-direction: row;
`;

const CampaignImageContainer = styled.div`
  position: relative;
  box-sizing: inherit;
  overflow: hidden;
`;

const CampaignImage = styled.img`
  border-radius: 5px 0px 0px 5px;
  object-fit: cover;
  width: 215px;
  height: 100%;
`;

const CampaignInfoContainer = styled.div`
  width: 100%;
  padding: 15px;
`;

const CampaignTag = styled.span`
  color: #c9366f;
  &:hover {
    color: #40bda5;
  }
  cursor: pointer;
  font-size: 14px;
`;

const CampaignTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 15px;
`;

const CampaignTitle = styled.h3`
  font-weight: 500;
  cursor: pointer;
  &:hover {
    color: #40bda5;
  }
  transition: all 0.3s ease;
`;

const CampaignProgessContainer = styled.div``;

const CampaignMoneyContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CampaignMoney = styled.div`
  font-size: 14px;
  text-align: left;
`;

const CampaignNeed = styled.div`
  font-size: 14px;
  text-align: right;
`;

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

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const BottomCampaign = styled.div`
  padding: 20px 0px 0px;
  display: flex;
  justify-content: space-between;
`;

const UserContainer = styled.div`
  align-items: start;
  display: flex;
`;

const AvatarContainer = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const UsernameContainer = styled.div``;

const CampaignSuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SuccessRate = styled.div`
  font-weight: 900;
  font-size: 14px;
`;

const Success = styled.div`
  font-size: 14px;
  color: #aaaeb3;
`;

const SwitchContainer = styled.div`
  border: 0.1px solid lightgray;
  border-radius: 5px;
  width: 1120px;
  margin: 0px 30px;
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
`;

const ButtonArrow = styled.button`
  border: none;
  color: #939393;
  &:hover {
    color: #40bda5;
  }
  transition: all 0.5s ease;
  background-color: transparent;
  margin: 15px;
  font-size: 16px;
  padding: 5px;
  font-weight: 800;
  cursor: pointer;
`;

const ButtonNumberContainer = styled.div`
  justify-content: center;
  align-items: center;
  width: fit-content;
  margin: 15px;
`;

const ButtonNumber = styled.button`
  cursor: pointer;
  background-color: transparent;
  border-radius: 50%;
  height: 25px;
  width: 25px;
  font-size: 14px;
  color: black;
  border: none;
  font-weight: 600;
  margin: 5px;
  &:hover {
    color: ${(props) => (props.nohover === "true" ? "black" : "white")};
    background-color: ${(props) =>
      props.nohover === "true" ? "transparent" : "#c9366f"};
  }
  transition: all 0.5s ease;
`;

const IconButtonStyled = styled(IconButton)`
  position: absolute;
  padding: 5px 5px;
  color: #0275d8;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 2;
  top: 0;
  right: 0;
`;

const AllCampaign = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const location = useLocation();
  const page = location.pathname.split("/")[2];
  useEffect(() => {
    const getCampaigns = async () => {
      try {
        let extraURL;
        extraURL = page ? page : "";
        const resCampaign = await publicRequest.get(
          `/campaign/?tag=${extraURL}`
        );
        setCampaigns(resCampaign.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getCampaigns();
  }, [page]);

  const Shorten = (value) => {
    var newValue = value;
    if (value >= 1000) {
      var suffixes = ["", "k", "m", "b", "t"];
      var suffixNum = Math.floor(("" + value).length / 3);
      var shortValue = "";
      for (var precision = 2; precision >= 1; precision--) {
        shortValue = parseFloat(
          (suffixNum !== 0
            ? value / Math.pow(1000, suffixNum)
            : value
          ).toPrecision(precision)
        );
        var dotLessShortValue = (shortValue + "").replace(
          /[^a-zA-Z 0-9]+/g,
          ""
        );
        if (dotLessShortValue.length <= 2) {
          break;
        }
      }
      if (shortValue % 1 !== 0) shortValue = shortValue.toFixed(1);
      newValue = shortValue + suffixes[suffixNum];
    }
    return newValue;
  };

  const handleFavorite = (e, id) => {
    e.preventDefault();
    console.log("handleFavorite");
    user ? favorite(dispatch, user._id, id) : console.log("Bạn chưa đăng nhập");
  };

  const checkFavorite = (id) => {
    if (!user) return false;
    return user.favorite.find((x) => x.id === id);
  };

  const handleRemoveFavorite = (e, id) => {
    e.preventDefault();
    console.log("handleRemoveFavorite");
    user
      ? removefavorite(dispatch, user._id, id)
      : console.log("Bạn chưa đăng nhập");
  };

  return loading ? (
    <CircularProgressContainer>
      <CircularProgress />
    </CircularProgressContainer>
  ) : (
    <Container>
      <CampaignsContainer>
        {campaigns.map((campaign) => (
          <CampaignContainer key={campaign._id}>
            <Campaign>
              <CampaignImageContainer>
                <Link to={`../campaign/${campaign._id}`}>
                  <CampaignImage src={campaign.img} />
                </Link>
                {checkFavorite(campaign._id) ? (
                  <IconButtonStyled
                    onClick={(e) => handleRemoveFavorite(e, campaign._id)}
                  >
                    <FavoriteIcon />
                  </IconButtonStyled>
                ) : (
                  <IconButtonStyled
                    onClick={(e) => handleFavorite(e, campaign._id)}
                  >
                    <FavoriteBorderIcon />
                  </IconButtonStyled>
                )}
              </CampaignImageContainer>
              <CampaignInfoContainer>
                {campaign.tag.map((tag) => (
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`../all-campaigns/${tag}`}
                  >
                    <CampaignTag key={tag}>{tag} </CampaignTag>
                  </Link>
                ))}
                <Link
                  to={`../campaign/${campaign._id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <CampaignTitleContainer>
                    <CampaignTitle>{campaign.title}</CampaignTitle>
                  </CampaignTitleContainer>
                </Link>
                <CampaignProgessContainer>
                  <CampaignMoneyContainer>
                    <CampaignMoney>
                      <b>{Shorten(campaign.donatesum)} ₫</b> đã được ủng hộ
                    </CampaignMoney>
                    <CampaignNeed>
                      <b>{Shorten(campaign.donateneed)} ₫</b> mục tiêu
                    </CampaignNeed>
                  </CampaignMoneyContainer>
                  <ProgressBar
                    percentage={
                      (campaign.donatesum / campaign.donateneed) * 100
                    }
                  />
                </CampaignProgessContainer>
                <Hr />
                <BottomCampaign>
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to={`../user/${campaign.username}`}
                  >
                    <UserContainer>
                      <AvatarContainer>
                        <Avatar id={campaign.username} />
                      </AvatarContainer>
                      <UsernameContainer>
                        <Username id={campaign.username}></Username>
                      </UsernameContainer>
                    </UserContainer>
                  </Link>
                  <CampaignSuccessContainer>
                    <SuccessRate>
                      {Math.round(
                        (campaign.donatesum / campaign.donateneed) * 100
                      )}
                      %{" "}
                    </SuccessRate>
                    <Success>Thành công</Success>
                  </CampaignSuccessContainer>
                </BottomCampaign>
              </CampaignInfoContainer>
            </Campaign>
          </CampaignContainer>
        ))}
      </CampaignsContainer>
      <SwitchContainer>
        <ButtonArrow>TRƯỚC</ButtonArrow>
        <ButtonNumberContainer>
          <ButtonNumber>1</ButtonNumber>
          <ButtonNumber>2</ButtonNumber>
          <ButtonNumber nohover="true">...</ButtonNumber>
          <ButtonNumber>8</ButtonNumber>
        </ButtonNumberContainer>
        <ButtonArrow>SAU</ButtonArrow>
      </SwitchContainer>
    </Container>
  );
};

export default AllCampaign;
