import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { publicRequest } from "../../requestMethod";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadingContainer = styled.div`
  width: 100vw;
  height: 50vh;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

const UpdateContainer = styled.div`
  border-radius: 5px;
  border: 1px solid #ebebf1;
  padding: 20px;
  background-color: #fff;
`;

const CampaignUpdate = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const user = useSelector((state) => state.user.currentUser);
  const [loading, setLoading] = useState(true);
  const [campaign, setCampaign] = useState({});

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
      <Timeline>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <UpdateContainer>12312312321312312312312321</UpdateContainer>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <UpdateContainer>12312312321312312312312321</UpdateContainer>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
          </TimelineSeparator>
          <TimelineContent>
            <UpdateContainer>12312312321312312312312321</UpdateContainer>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </Container>
  );
};

export default CampaignUpdate;
