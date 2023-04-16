import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Projects from "../components/Projects";
import Recommend from "../components/Recommend";
import Ongoing from "../components/Ongoing";
import Howto from "../components/Howto";
import SliderComponent from "../components/SliderComponent";
import Footer from "../components/Footer";

const Container = styled.div``;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Home = () => {
  return (
    <Container>
      <Navbar />
      <Recommend />
      <Projects />
      <Ongoing />
      <Howto />
      <SliderComponent />
      <Hr />
      <Footer />
    </Container>
  );
};

export default Home;
