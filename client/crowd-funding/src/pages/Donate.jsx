import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StripeCheckout from "react-stripe-checkout";
import { userRequest } from "../requestMethod";
import { useLocation, useNavigate } from "react-router-dom";

const Container = styled.div``;
const Wrapper = styled.div``;
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

const KEY =
  "pk_test_51N941iGn8BjmzShv5uCkfgIYoLX4GdfigEF1c4qWqgnma3N1MBowgwOQkJBicrmwMgHKHibzjmNmkcIgBsmU00aC00sFKpAJlY";

const Donate = () => {
  const [stripeToken, setStripeToken] = useState(null);
  const onToken = (token) => {
    setStripeToken(token);
  };

  const location = useLocation();
  const navigate = useNavigate();
  const id = location.pathname.split("/")[2];

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post(`/donate/payment/${id}`, {
          tokenId: stripeToken.id,
          amount: 20000,
        });
        console.log(res.data);
        navigate("/success");
      } catch (err) {
        console.log(err);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, navigate]);

  return (
    <Container>
      <Navbar />
      <Wrapper>
        {stripeToken ? (
          <span>Đang xử lí. Xin hãy đợi...</span>
        ) : (
          <StripeCheckout
            name="CrowdFunding"
            image="https://crowdfunding.comicola.com/wp-content/uploads/2021/06/comicola_crowdfunding_logo-1.png"
            description="Tổng tiền của bạn là 20.000 đ"
            amount={20000}
            stripeKey={KEY}
            token={onToken}
            currency="VND"
          >
            <Button>Thanh toán</Button>
          </StripeCheckout>
        )}
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Donate;
