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
      <Wrapper>
        <Timeline
          sx={{
            [`& .${timelineOppositeContentClasses.root}`]: {
              flex: 0.2,
            },
          }}
        >
          <TimelineItem>
            <TimelineOppositeContent>30-06-2023</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <UpdateContainer>
                VTV Chuyển động 24h - Cuốn sách ra đời từ cộng đồng
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/k6MIqGSvw_s"
                  title="VTV Chuyển động 24h - Cuốn sách ra đời từ cộng đồng"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
              </UpdateContainer>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>27-06-2023</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
            </TimelineSeparator>
            <TimelineContent>
              <UpdateContainer>
                Buổi lễ ra mắt cuốn sách sẽ được tổ chức vào ngày 26/07/2023 tại
                trung tâm Văn hóa Pháp. Mọi chi tiết sẽ được cập nhật trên
                fanpage của nhóm
              </UpdateContainer>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </Wrapper>
    </Container>
  );
};

export default CampaignUpdate;
