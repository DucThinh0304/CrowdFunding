import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { userRequest, publicRequest } from "../../requestMethod";
import StripeCheckout from "react-stripe-checkout";
import MainLogo from "../../asset/Happy.png";
import { CircularProgress } from "@mui/material";

const KEY =
  "pk_test_51N941iGn8BjmzShv5uCkfgIYoLX4GdfigEF1c4qWqgnma3N1MBowgwOQkJBicrmwMgHKHibzjmNmkcIgBsmU00aC00sFKpAJlY";

const LoadingContainer = styled.div`
  width: 100vw;
  height: 50vh;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  width: 100vw;
`;

const Desc = styled.div`
  margin: 40px;
  flex: 3;
`;

const DonateContainer = styled.div`
  flex: 1;
  margin: 20px;
  align-items: center;
  justify-content: center;
`;

const DonateBorder = styled.div``;

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

const CampaignInfomation = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState({});
  const [loading, setLoading] = useState(true);
  const [money, setMoney] = useState(0);
  const [stripeToken, setStripeToken] = useState(null);
  const today = new Date();
  const oneDay = 24 * 60 * 60 * 1000;
  const date = new Date(campaign.dayfinish);
  const checkDay = (check) => {
    return check < 0 ? false : true;
  };

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      console.log(money);
      try {
        const res = await userRequest.post(`/donate/payment/${user._id}`, {
          tokenId: stripeToken.id,
          campaignId: id,
          amount: money,
        });
        console.log(res.data);
        navigate("/success");
      } catch (err) {
        console.log(err);
      }
    };
    !user && navigate("/login");
    stripeToken && makeRequest();
  }, [stripeToken, navigate]);

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

  return loading ? (
    <LoadingContainer>
      <CircularProgress />
    </LoadingContainer>
  ) : (
    <Container>
      <Desc>{campaign.description}</Desc>
      <DonateContainer>
        {checkDay(Math.round((date - today) / oneDay)) === true
          ? "Ủng hộ nhận quà"
          : "Đã hết thời gian ủng hộ"}
        {campaign.donateamounts.map((donate) => (
          <DonateBorder>
            <StripeCheckout
              name="Happy Fund"
              image={MainLogo}
              description={`Tổng tiền của bạn là ${donate}`}
              amount={donate}
              stripeKey={KEY}
              token={onToken}
              currency="VND"
            >
              <Button
                onClick={() => setMoney(donate)}
                disabled={
                  checkDay(Math.round((date - today) / oneDay)) === true
                    ? false
                    : true
                }
              >
                {donate} ₫
              </Button>
            </StripeCheckout>
          </DonateBorder>
        ))}
      </DonateContainer>
    </Container>
  );
};

export default CampaignInfomation;
