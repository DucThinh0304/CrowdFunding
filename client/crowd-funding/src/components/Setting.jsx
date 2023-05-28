import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import SupportCampaign from "./setting/SupportCampaign";
import Favorite from "./setting/Favorite";
import AccountSetting from "./setting/AccountSetting";

const Container = styled.div`
  padding-left: 50px;
`;

const Setting = () => {
  const location = useLocation();
  const page = location.pathname.split("/")[2];
  useEffect(() => {}, [page]);
  return (
    <Container>
      {page === "support-campaign" ? (
        <SupportCampaign />
      ) : page === "favorite" ? (
        <Favorite />
      ) : page === "setting" ? (
        <AccountSetting />
      ) : (
        "c"
      )}
    </Container>
  );
};

export default Setting;
