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
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from "@mui/lab/TimelineOppositeContent";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
`;

const LoadingContainer = styled.div`
  width: 100vw;
  height: 50vh;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  border-radius: 5px;
  border: 1px solid #ebebf1;
  padding: 20px;
  width: 50vw;
  flex-direction: column;
`;

const UpdateContainer = styled.div`
  border-radius: 5px;
  border: 1px solid #ebebf1;
  padding: 20px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  width: 450px;
  height: auto;
  margin: 5px;
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

  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("-");
  };

  return loading ? (
    <LoadingContainer>
      <CircularProgress />
    </LoadingContainer>
  ) : (
    <Container>
      <Wrapper>
        <Timeline
          sx={{
            [`& .${timelineOppositeContentClasses.root}`]: {
              flex: 0.2,
            },
          }}
        >
          {campaign.update.length === 0 ? (
            <div>Dự án này chưa có cập nhật nào</div>
          ) : (
            <>
              {campaign.update.map((update) => (
                <TimelineItem>
                  <TimelineOppositeContent>
                    {formatDate(update.day)}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <UpdateContainer>
                      {update.description}
                      <Image src={update.img} alt="" />
                    </UpdateContainer>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </>
          )}
        </Timeline>
      </Wrapper>
    </Container>
  );
};

export default CampaignUpdate;
