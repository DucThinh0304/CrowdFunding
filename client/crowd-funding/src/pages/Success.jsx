import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Success = () => {
  return (
    <Container>
      <div>Thanh toán thành công</div>
      <Link to="/">Quay về trang chủ</Link>
    </Container>
  );
};

export default Success;
